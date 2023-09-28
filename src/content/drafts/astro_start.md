---
title: 初探 Astro
categories:
  - Astro
tags:
  - Astro
date: 2023/06/30
---

## 什麼是 Astro

Astro 是一個令人興奮的工具，它以「用較少的 JavaScript 打造極速網站」為核心理念。透過 Astro，使用熟悉的切版技術快速搭建自己的部落格。更令人驚艷的是，還可以使用 Markdown 輕鬆更新頁面內容。

Astro 採用了一種全新的方法，將網站的組件化，利用標綁（bundling）的方式在編譯時處理這些組件，並生成高效的靜態網頁。這樣不僅可以大幅減少頁面載入時間，提升網站的速度和性能，還能專注於切版，而不需要過多地涉及繁瑣的 JavaScript 開發。

而且，Astro 還支持使用 Markdown 語法來撰寫和更新頁面內容。
Markdown 是一種輕量級的標記語言，具有簡單易讀的特點，讓您可以輕鬆地編寫文章、撰寫文檔或者更新部落格內容。
Astro 在編譯時會自動將 Markdown 轉換為 HTML，使您的內容在瀏覽器中呈現出優雅的樣式。

## 開始使用

以下是使用 npm 安裝 Astro 的步驟：

在命令提示字元中，執行以下命令來安裝 Astro：

```bash
npm create astro@latest
```

輸入專案名稱

```bash
dir   Where should we create your new project?
      ./astroTemplate
```

選取要專案開始類型
這裡選我選 blog，系統會將 blog 會使用到的套件一併安裝上

```bash
tmpl   How would you like to start your new project?
        — Include sample files
        > Use blog template
        — Empty
```

接著開始安裝
詢問要不要使用依賴套件，選 yes

```bash
deps   Install dependencies? (recommended)
        ● Yes  ○ No
```

```bash
ts   Do you plan to write TypeScript?
      ● Yes  ○ No
```

```bash
use   How strict should TypeScript be?
      > Strict (recommended)
      — Strictest
      — Relaxed
```

```bash
git   Initialize a new git repository? (optional)
      ● Yes  ○ No
```

安裝完成後切換到專案資料夾

### 開始執行

```bash
npm run start
```

---

## 專案架構

```bash
├── src/
│   ├── components/
│   │   ├── BaseHead.astro
│   │   └-─ Footer.astro
│   └── content/
│   │   ├── blog/
│   │   │   ├── first-post.md
│   │   │   ├── using-mdx.md
│   │   │   └── second-post.md
│   │   └── config.ts
│   ├── layouts/
│   │   └-─ BlogPost.astro
│   └── pages/
│   │   ├── blog/
│   │   │   ├── [...slug].astro
│   │   │   └── index.astro
│   │   ├── rss.xml.js
│   │   └── index.astro
│   └── styles/
│       └-─ global.css
├── public/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

### src

專案的程式碼都放在 `src` 資料夾中。

#### components

在 `components` 資料夾包含了專案中使用的組件，這些組件可以在不同的頁面和佈局中重複使用。例如，`BaseHead.astro` 可以用於定義每個頁面的 `head` 元素，`Footer.astro` 可以用於顯示網站的底部。

#### layouts

`layouts` 資料夾包含了佈局（layout）組件，這些組件用於定義網站的整體佈局結構。例如，BlogPost.astro 可以用於顯示部落格文章的佈局。

#### pages

`pages` 資料夾是網站的頁面所在位置。可以在這裡使用各種格式的文件，如 `.astro`、`.html`、`.md`、`.mdx`（需要安裝 MDX 整合）以及 `.js/.ts` 文件。

#### content

`content` 資料夾包含文章的內容，您可以使用 Markdown 或 MDX 格式（`.md`, `.mdx`）來編寫並更新頁面內容。

#### styles

`styles` 資料夾包含網站的 CSS 樣式文件，您可以在這裡定義全域的樣式規則。

### public

`public` 資料夾是用於存放公開資源的地方，例如 robots.txt、favicon.svg 和 social-image.png 等文件。

### astro.config.mjs

`astro.config.mjs` 是 Astro 專案的配置文件，您可以在這裡定義各種設定選項。

### package.json

`package.json` 文件是 Astro 專案的描述文件，其中包含了專案的相依套件、指令腳本等資訊。

### tsconfig.json

如果計劃使用 TypeScript 進行開發，`tsconfig.json` 文件是 TypeScript 的設定文件。

---

參考資料：
[astro 官網](https://astro.build/)

學習頻道：
