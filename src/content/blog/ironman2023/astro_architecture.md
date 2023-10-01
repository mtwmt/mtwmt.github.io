---
title: 了解 Astro 專案的架構
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/05
---

現在，我們將深入了解 Astro 專案的結構，這有助於您更好地理解 `Astro` 應用的架構和組織方式。

## 專案架構概述

Astro 專案的結構如下：

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

以下是每個資料夾的檔案與用途說明：

### src

Astro 專案的程式碼存放在 `src` 資料夾中，這包括：

- 元件（Components）
- 內容（Content）
- 佈局（Layouts）
- 頁面（Pages）
- 樣式（Styles）

#### components

在 `components` 資料夾中包含了用於專案的組件，這些組件可以在不同的頁面和佈局中重複使用。例如，`BaseHead.astro` 可以用於定義每個頁面的 `head` 元素，`Footer.astro` 可以用於顯示網站的底部。

#### layouts

`layouts` 資料夾包含了佈局（layout）組件，這些組件用於定義網站的整體佈局結構。例如，`BlogPost.astro` 用於顯示部落格文章的佈局。

#### pages

`pages` 資料夾是網站的頁面所在位置。您可以在這裡使用多種文件格式，如 `.astro`、`.html`、`.md`、`.mdx`（需要安裝 MDX 整合）以及 `.js/.ts` 文件。

#### content

`content` 資料夾包含文章的內容，您可以使用 Markdown 或 MDX 格式（`.md`, `.mdx`）來編寫和更新頁面內容。

#### styles

`styles` 資料夾包含網站的 CSS 樣式文件，您可以在這裡定義全域的樣式規則。

### public

`public` 資料夾用於存放公開資源，例如 robots.txt、favicon.svg 和 social-image.png 等文件。

### astro.config.mjs

`astro.config.mjs` 是 Astro 專案的配置文件，您可以在這裡定義各種設定選項。

### package.json

`package.json` 文件是 Astro 專案的描述文件，其中包含了專案的相依套件、指令腳本等資訊。

### tsconfig.json

如果計劃使用 TypeScript 進行開發，`tsconfig.json` 文件是 TypeScript 的設定文件。

## 總結

透過這份對 Astro 專案結構的初探，我們深入了解了 Astro 的目錄結構和各個檔案的用途。
