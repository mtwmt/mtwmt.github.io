---
title: Cloudflare Workers 圖片壓縮實戰：減少 85% 的踩坑歷程
categories:
  - vibe coding
tags:
  - vibe coding
  - Cloudflare
  - Google Apps Script
date: 2026/01/12
---

把書籍封面圖從 390KB 壓到 58KB，減少 85%！這篇文章記錄了我從 Google Apps Script 遷移到 Cloudflare Workers 實現 WebP 壓縮的完整過程，包含各種套件的嘗試與踩坑經驗。

## 專案背景

最近在開發一個書架管理 App，使用者掃描 ISBN 就能新增書籍。App 會自動從博客來抓封面圖，然後存到 Cloudflare R2。

問題來了：博客來的封面圖通常有 300KB~500KB，長期下來儲存空間會爆炸，App 載入也會變慢。

所以目標很簡單：**把封面圖壓縮到 200KB 以下**。

---

## 第一版：用 Google Apps Script 壓圖

一開始我選擇用 GAS 來處理，原因是：

- **免費** - 不用錢就是香
- **有現成的圖片處理** - 可以利用 Google Drive 的縮圖功能
- **部署簡單** - 不需要伺服器

### GAS 的魔法：借用 Google Drive 縮圖

GAS 壓圖的方式蠻有趣的，是利用 Google Drive 自動產生縮圖的機制：

```javascript
// 1. 把圖片丟到 Google Drive
var file = DriveApp.createFile(imageBlob);

// 2. 取得縮圖連結
var thumbnailUrl = Drive.Files.get(file.getId(), {
  fields: "thumbnailLink",
}).thumbnailLink;

// 3. 改變縮圖尺寸（s500 = 寬度 500px）
var resizedUrl = thumbnailUrl.replace(/=s\d+/, "=s500");

// 4. 下載壓縮後的圖片
var compressed = UrlFetchApp.fetch(resizedUrl);
```

這招實測效果不錯，400KB 的圖大概能壓到 100KB 左右。

### 但是有幾個痛點...

1. **架構太複雜**

   ```
   App → Worker → GAS → Google Drive → GAS → Worker → R2
   ```

   繞了一大圈，每張圖多花 2~3 秒。

2. **只能輸出 JPEG**
   Google 的縮圖只給 JPEG，沒辦法用更省空間的 WebP。

3. **依賴 Google 服務**
   哪天 Google 改 API 就 GG 了。

---

## 第二版：搬到 Cloudflare Workers

決定把壓縮功能直接做在 Worker 裡面，目標是輸出 WebP 格式。

新架構變成這樣：

```
App → Cloudflare Worker（壓縮 + 儲存）→ R2
```

簡單多了對吧？但接下來就是踩坑地獄...

---

## 踩坑一：@cf-wasm/photon

這是專門給 Cloudflare Workers 用的圖片處理套件，聽起來很完美。

```typescript
import { PhotonImage } from "@cf-wasm/photon/workerd";

const image = PhotonImage.new_from_byteslice(inputBytes);
const webpData = image.get_bytes_webp();
```

結果...

```
原圖：300KB → WebP：541KB 😱
```

**坑：`get_bytes_webp()` 沒有品質參數**

它用的是無損壓縮，壓出來反而更大。雖然有 `get_bytes_jpeg(quality)` 可以控制品質，但我就是要 WebP 啊！

---

## 踩坑二：webp-wasm

找到這個套件，有品質參數！

```bash
npm install webp-wasm
```

部署...噴錯：

```
X [ERROR] Could not resolve "fs"
X [ERROR] Could not resolve "path"
```

**坑：底層用了 Node.js 的 fs 和 path**

Cloudflare Workers 不支援這些 Node.js 模組，GG。

---

## 踩坑三：@saschazar/wasm-webp

這個標榜支援「Web Workers 環境」，感覺有戲？

```typescript
import initWebp, { encodeRGBA } from "@saschazar/wasm-webp";
await initWebp();
const webpData = encodeRGBA(rgbaData, width, height, quality);
```

部署成功！結果執行時：

```
ReferenceError: __dirname is not defined
```

**坑：用 `__dirname` 來找 WASM 檔案**

這是 Node.js 才有的變數，Workers 不認識。

---

## 踩坑四：canvaskit-wasm

想說 .NET 有 SkiaSharp，Google 應該也有 JS 版吧？找到了 `canvaskit-wasm`。

**坑：WebP 編碼支援很爛**

這套件主要是畫 Canvas 用的，單純轉圖片格式不太行。

---

## 終於成功：wasm-image-optimization 🎉

繼續挖，挖到這個套件：

```bash
npm install wasm-image-optimization
```

它的 README 直接寫「**Supports Cloudflare Workers**」，看到這句話眼睛都亮了。

```typescript
import { optimizeImage } from "wasm-image-optimization";

const webpData = await optimizeImage({
  image: inputBytes,
  width: 500, // 最大寬度
  quality: 80, // 品質 0-100
  format: "webp",
});
```

### 設定 wrangler.jsonc

記得加上 `nodejs_compat`：

```json
{
  "compatibility_flags": ["nodejs_compat"]
}
```

### 結果

```
原圖：390KB → WebP：58KB ✅
減少 85%！
```

比 GAS 的效果還好！

---

## 各套件踩坑總結

| 套件                        | WebP 有損壓縮 | 品質控制 | Workers 相容 |
| --------------------------- | :-----------: | :------: | :----------: |
| @cf-wasm/photon             |      ❌       |    ❌    |      ✅      |
| webp-wasm                   |      ✅       |    ✅    |      ❌      |
| @saschazar/wasm-webp        |      ✅       |    ✅    |      ❌      |
| canvaskit-wasm              |      ⚠️       |    ⚠️    |      ⚠️      |
| **wasm-image-optimization** |      ✅       |    ✅    |      ✅      |

---

## 前後比較

| 項目     | GAS 方案 | Workers 方案 |
| -------- | :------: | :----------: |
| 輸出格式 |   JPEG   |     WebP     |
| 壓縮率   |   ~70%   |     ~85%     |
| 延遲     |  2~3 秒  |    < 1 秒    |
| 外部依賴 |  Google  |      無      |

---

## 學到的教訓

1. **不是所有 WASM 套件都能在 Workers 跑**
   很多套件說「支援瀏覽器」，但初始化還是偷用 Node.js 的東西。

2. **找專門為目標平台設計的套件**
   `wasm-image-optimization` 明確寫支援 Workers，這種比較可靠。

3. **nodejs_compat 不是萬能的**
   它只模擬部分 API，像 `__dirname` 就不支援。

4. **WebP 真的很香**
   同畫質比 JPEG 小很多，現在瀏覽器都支援了，沒理由不用。

---

希望這篇踩坑紀錄能幫到想在 Cloudflare Workers 上做圖片處理的朋友！