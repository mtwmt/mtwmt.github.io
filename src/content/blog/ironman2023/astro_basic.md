---
title: Astro 基礎介紹與開發環境設定
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/04
---

前面已經介紹了 Astro 的優點，相信你已經迫不及待要開始試用了！現在，我們將逐步指導你如何設定適合開發 Astro 的環境。

## 開發環境設置

首先，請確保你已經安裝了以下的工具和環境：

- Node.js 和 npm：請確保你已經安裝了 Node.js 和 npm（Node Package Manager）。你可以在 Node.js 的官方網站（https://nodejs.org/）下載並安裝最新版本的 Node.js。

- 使用 `Visual Studio Code (VSCode)` 作為你的開發工具。

<!-- Node.js 和 npm：請確保你已經安裝了 Node.js 和 npm（Node Package Manager）。你可以在 Node.js 的官方網站（https://nodejs.org/）下載和安裝最新版本的 Node.js。

接下來使用 `vscode` 進行開發 -->

> 注意：Astro v3.0 或更高版本僅支援 Node 版本 `v18.14.1` 或更高。

檢查目前安裝 Node 版本

```bash
node -v
```

### TypeScript

如果您已在本地安裝 TypeScript，請更新至至少 v5.0。

```bash
npm install typescript@latest --save-dev
```

---

## 建立新的 Astro 項目

```bash
npm create astro@latest
```

- 輸入專案名稱 這裡我將專案名稱命名為 `astroTemplate`

```bash
dir   Where should we create your new project?
      ./astroTemplate
```

- 選擇要使用的專案模板。這裡我們選擇了 `blog`，系統將會安裝相關套件，以便使用預設的 `blog` 樣式進行開發。

```bash
tmpl   How would you like to start your new project?
        — Include sample files
        > Use blog template
        - Empty
```

接下來按照提示進行安裝：

- 問你是否要安裝依賴套件，選擇 Yes：

```bash
deps   Install dependencies? (recommended)
        ● Yes  ○ No
```

- 是否要使用 `TypeScript`，選擇 "Yes"：

```bash
ts   Do you plan to write TypeScript?
      ● Yes  ○ No
```

- 選擇 `TypeScript` 的模式，這裡選擇 `Relaxed` 即可：

```bash
use   How strict should TypeScript be?
      — Strict (recommended)
      — Strictest
      > Relaxed
```

- 選擇是否初始化一個 Git 儲存庫，選擇 Yes：

```bash
git   Initialize a new git repository? (optional)
      ● Yes  ○ No
```

- 安裝完成後，切換到專案資料夾

```bash
cd astroTemplate
```

---

### 開始執行

安裝完成後，切換到專案資料夾並啟動開發伺服器：

```bash
npm run start
```

這將在本地瀏覽器中啟動開發伺服器，並自動打開你的 Astro 項目。你可以在瀏覽器中看到項目的首頁。

如下圖：

<img src="/assets/images/astro/v3/001.jpg" />

---

## 總結

透過以上步驟，你已經成功安裝了 Astro 開發環境並建立了新的 Astro 項目。現在，你可以開始使用 Astro 框架進行開發！

## 參考資料
[Install Astro with the Automatic CLI](https://docs.astro.build/en/install/auto/)