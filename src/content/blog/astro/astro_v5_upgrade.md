---
title: "Astro 5.x 升級實戰：從 4.10 到 5.14 的完整遷移指南"
date: 2025-10-04
tags: ["astro", "javascript", "typescript"]
categories: ["astro"]
---

## 前言

最近進行部落格的技術升級，首先從 Astro 4.10.1 升級到 5.14.1，接著再處理 [TailwindCSS v4 升級](/blog/tailwindcss/tailwind_v4_upgrade/)。Astro 的升級相對平順，主要是 API 變更和最佳實踐的調整，沒有 TailwindCSS 那麼多坑要踩。

## 升級概述

**升級版本：**
- Astro: 4.10.1 → 5.14.1
- @astrojs/mdx: 3.1.4 → 4.3.6
- @astrojs/rss: 4.0.7 → 4.0.12
- @astrojs/sitemap: 3.1.6 → 3.6.0

**主要變更：**
- ViewTransitions → ClientRouter
- Content Collections API 更新
- 實驗性功能清理
- 整合套件版本同步

## 第一階段：升級核心套件

### 1. 更新 Astro 及相關套件

```bash
npm install astro@latest @astrojs/mdx@latest @astrojs/rss@latest @astrojs/sitemap@latest
```

### 2. 檢查重大變更

Astro 5.x 移除了許多實驗性功能，需要檢查 `astro.config.mjs`：

```javascript
// ❌ Astro 4.x (已棄用)
export default defineConfig({
  experimental: {
    contentCollectionCache: true,  // 已移除
  },
});

// ✅ Astro 5.x
export default defineConfig({
  // 不再需要 experimental 設定
  prefetch: true,  // 現在是正式功能
});
```

## 第二階段：ViewTransitions → ClientRouter

### 問題：ViewTransitions 已棄用

Astro 5.x 將 `ViewTransitions` 改名為 `ClientRouter`，這是一個重要的 API 變更。

**錯誤訊息：**
```
The <ViewTransitions /> component has been renamed to <ClientRouter />.
```

### 解決方案：更新所有引用

**BaseHead.astro 修改：**

```astro
---
// ❌ Astro 4.x
import { ViewTransitions } from 'astro:transitions';

// ✅ Astro 5.x
import { ClientRouter } from 'astro:transitions';
---

<!-- ❌ 舊寫法 -->
<ViewTransitions />

<!-- ✅ 新寫法 -->
<ClientRouter />
```

**為什麼改名？**

`ClientRouter` 更清楚地表達了它的功能：
- 這是一個**客戶端路由器**，而非單純的過場動畫
- 負責 SPA 式的頁面切換
- 處理預載入（prefetch）邏輯

## 第三階段：Content Collections 優化

### 1. 型別定義改進

Astro 5.x 的 Content Collections 型別推斷更強大：

```typescript
// ✅ 使用 CollectionEntry 型別
import type { CollectionEntry } from 'astro:content';

export const findPrevAndNext = (
  arr: CollectionEntry<'blog'>[],
  curr: CollectionEntry<'blog'>
) => {
  // TypeScript 現在能完整推斷 slug, data 等屬性
  const currentIndex = arr.findIndex((obj) => obj.slug === curr.slug);

  // ...
};
```

**改進點：**
- ✅ 不再需要手動定義 post 型別
- ✅ `slug`、`data`、`render()` 等方法都有完整型別提示
- ✅ 支援泛型，可以指定 collection 名稱

### 2. getCollection 使用最佳實踐

```astro
---
import { getCollection } from 'astro:content';

// ✅ 在 getStaticPaths 中使用
export async function getStaticPaths() {
  const posts = await getCollection("blog");

  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

// ✅ 在 Astro 組件中使用
const posts = await getCollection("blog");
const { post } = Astro.props;
const { Content } = await post.render();
---
```

## 第四階段：清理未使用的程式碼

### 1. 移除實驗性配置

Astro 5.x 移除了許多實驗性功能，檢查 `astro.config.mjs`：

```javascript
// ❌ 移除這些已棄用的設定
export default defineConfig({
  experimental: {
    contentCollectionCache: true,    // 已移除
    contentCollectionJsonSchema: true, // 已移除
  },
});
```

### 2. 清理註解掉的程式碼

升級過程中累積的註解程式碼應該清理：

```javascript
// ❌ 刪除不用的註解
// markdown: {
//   shikiConfig: {
//     theme: "material-theme-darker",
//     wrap: true,
//   },
// },

// ✅ 保持配置檔簡潔
export default defineConfig({
  site: "https://mtwmt.com",
  prefetch: true,
  integrations: [/* ... */],
});
```

## 第五階段：TypeScript 最佳實踐

### 1. 移除 `any` 型別

Astro 5.x 的型別系統更完善，不再需要 `any`：

```typescript
// ❌ Astro 4.x 常見寫法
menu.map((d: any) => {
  return (
    <li>
      <a href={d.href}>{d.name}</a>
    </li>
  );
})

// ✅ Astro 5.x 推薦寫法
menu.map((d) => (
  <li>
    <a href={d.href}>{d.name}</a>
  </li>
))
```

### 2. 客戶端腳本型別安全

```typescript
// ❌ 舊寫法
let codeBlocks = Array.from(document.querySelectorAll("pre")) as any;

async function copyCode(block: any, button: any) {
  let code = block.querySelector("code");
  // ...
}

// ✅ 新寫法
let codeBlocks = Array.from(document.querySelectorAll("pre"));

async function copyCode(block: HTMLPreElement, button: HTMLButtonElement) {
  let code = block.querySelector("code");
  let text = code?.innerText || "";
  // ...
}
```

### 3. 安全的 DOM 操作

```typescript
// ❌ 可能導致錯誤
codeBlock.parentNode.insertBefore(wrapper, codeBlock);

// ✅ 使用可選鏈
codeBlock.parentNode?.insertBefore(wrapper, codeBlock);
```

## 第六階段：效能優化

### 1. Prefetch 設定

Astro 5.x 將 prefetch 變為正式功能：

```javascript
export default defineConfig({
  prefetch: true,  // 啟用自動預載入
});
```

**效果：**
- 自動預載入可見連結
- 減少頁面切換延遲
- 改善使用者體驗

### 2. 移除未使用的依賴

升級後檢查並移除未使用的套件：

```bash
# 檢查已安裝但未使用的套件
npm uninstall astro-expressive-code @tailwindcss/forms
```

**移除後的好處：**
- ✅ 減少 `node_modules` 大小
- ✅ 加快安裝速度
- ✅ 降低安全風險

### 3. Icon 載入優化

```javascript
// ❌ 載入所有 icons（效能差）
icon({
  include: {
    "grommet-icons": ["*"],
    teenyicons: ["*"],
    // ...
  },
})

// ✅ 只載入使用的 icons（建議）
icon({
  include: {
    "grommet-icons": ["info"],
    teenyicons: ["left-outline", "right-outline"],
    ic: ["outline-search", "outline-question-mark"],
    // 只列出實際使用的
  },
})
```

## 關鍵知識點總結

### 1. API 名稱變更

| Astro 4.x | Astro 5.x | 說明 |
|-----------|-----------|------|
| `ViewTransitions` | `ClientRouter` | 更清楚表達客戶端路由功能 |
| `experimental.contentCollectionCache` | 已移除 | 現在是預設行為 |

### 2. TypeScript 改進

- ✅ `CollectionEntry<T>` 型別更精確
- ✅ 不再需要手動定義 post 型別
- ✅ 更好的型別推斷和自動完成

### 3. 效能優化重點

- ✅ `prefetch: true` 啟用自動預載入
- ✅ Icon 按需載入，避免全量引入
- ✅ 移除未使用的依賴

## 驗證升級成功

### 1. 建置測試

```bash
npm run build
```

應該看到：
```
[build] 263 page(s) built in 9.52s
[build] Complete!
```

### 2. 開發伺服器測試

```bash
npm run dev
```

檢查：
- ✅ ClientRouter 正常運作
- ✅ 頁面切換流暢
- ✅ Prefetch 功能啟用
- ✅ 無 TypeScript 錯誤

### 3. 功能測試

- ✅ Content Collections 正常讀取
- ✅ MDX 渲染正確
- ✅ RSS feed 生成成功
- ✅ Sitemap 生成正確

## 常見問題 FAQ

### Q1: ViewTransitions 和 ClientRouter 有什麼差別？

**A:** 功能完全相同，只是改名。`ClientRouter` 更清楚表達它是一個客戶端路由器，負責 SPA 式的頁面切換。

### Q2: 升級後 Content Collections 報錯怎麼辦？

**A:** 檢查以下幾點：
1. 使用 `CollectionEntry<'blog'>` 型別
2. 確認 `src/content/config.ts` 的 schema 定義正確
3. 檢查是否有使用已棄用的 API

### Q3: 需要更新所有 @astrojs/* 套件嗎？

**A:** 是的。Astro 5.x 的整合套件（@astrojs/mdx、@astrojs/rss 等）都需要更新到對應版本，否則可能不相容。

### Q4: prefetch 會影響效能嗎？

**A:** 不會。Astro 的 prefetch 很聰明：
- 只預載入可見連結
- 使用 Intersection Observer
- 不會重複載入
- 可以針對個別連結停用

### Q5: 如何確認所有功能都正常？

**A:** 執行以下檢查：
```bash
# 1. 檢查型別
npm run astro check

# 2. 建置測試
npm run build

# 3. 預覽網站
npm run preview
```

## 升級效益

✅ **更好的開發體驗**
- 更精確的型別提示
- 更清晰的 API 命名

✅ **更快的建置速度**
- 移除實驗性功能的 overhead
- 優化的 Content Collections

✅ **更好的效能**
- Prefetch 正式化
- 更輕量的 bundle

## 搭配 TailwindCSS v4 升級

**實際升級順序：**

本次專案升級順序為：
1. **先升級 Astro 5.x**（本文）
2. **再升級 TailwindCSS v4**（[升級指南](/blog/tailwindcss/tailwind_v4_upgrade/)）

**為什麼這個順序？**
- ✅ Astro 5.x 升級相對簡單，可以快速完成並驗證
- ✅ 先確保框架本身穩定，建立可靠的基礎
- ✅ TailwindCSS v4 改動較大（Sass 相容性問題），需要更多時間處理
- ✅ 避免同時調試多個問題，降低排錯難度
- ✅ 當 TailwindCSS 出問題時，至少 Astro 是穩定的

這個順序讓整個升級過程更可控，推薦給同樣要做雙重升級的朋友！

## 結語

Astro 5.x 的升級整體來說相對平順，主要是：

1. **API 改名** - ViewTransitions → ClientRouter
2. **型別改進** - CollectionEntry 更精確
3. **清理實驗功能** - 移除過時的 experimental 設定
4. **最佳實踐** - 移除 any、優化載入

相比 TailwindCSS v4 的升級，Astro 5.x 的變動小很多，大多是優化和改進，沒有重大的破壞性變更。

希望這篇文章能幫助你順利完成 Astro 5.x 升級！

## 參考資源

- [Astro 5.0 發布公告](https://astro.build/blog/astro-5/)
- [Astro 5.x 遷移指南](https://docs.astro.build/en/guides/upgrade-to/v5/)
- [ClientRouter 文件](https://docs.astro.build/en/guides/view-transitions/)
- [Content Collections 文件](https://docs.astro.build/en/guides/content-collections/)
