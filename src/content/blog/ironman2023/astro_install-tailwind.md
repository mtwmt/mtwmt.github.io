---
title: Astro 整合：使用 Tailwind CSS 優化你的 Blog
categories:
  - Astro
tags:
  - Astro
  - TailwindCss
  - ironman2023
date: 2023/09/16
---

看了這麼多天的文章介紹 Astro，是不是心動想躍躍欲試了呢？
接下來，我們將開始實作我們的 blog。

將我們第二天文章裡介紹的開發環境啟動後，會看到以下畫面

<img src="/assets/images/astro/install-tailwind/001.jpg" width="50%" />

接下來，都將會使用 `tailwind CSS` 來撰寫版面樣式，來優化這個 Blog！

## 安裝 Tailwind CSS

你可以使用以下指令快速安裝 `Tailwind CSS`：

### 快速安裝

```bash
# 使用 NPM
npx astro add tailwind

# 使用 Yarn
yarn astro add tailwind

# 使用 PNPM
pnpm astro add tailwind
```

如果你遇到任何安裝問題，或想手動進行安裝，請參考下面的步驟。

### 手動安裝

你可以使用以下指令手動安裝 `Tailwind CSS`：

```bash
npm install @astrojs/tailwind tailwindcss
```

安裝完成後，打開根目錄的 `astro.config.mjs` 文件，將以下程式碼整合到 Astro 中：

```ts
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // ...
  integrations: [tailwind()],
});
```

## 開始使用

安裝完整合套件後，Tailwind 的實用類別就可以在你的 Astro 專案中使用了。你可以前往 [Tailwind 的官方文件](https://tailwindcss.com/docs/installation) 了解如何使用 Tailwind，只需將相應的類別添加到你的 .astro 檔案中的 HTML 元素即可。

自動添加前綴的設置在開發模式和生產構建時都已經設置好，因此 Tailwind 的類別也支援舊版瀏覽器。

## 配置

### 配置 Tailwind

如果按照快速安裝的指示操作，並且對每個提示都回答了「是」，那麼在專案根目錄中應該會有一個 `tailwind.config.cjs` 文件，你可以在這個文件中進行 `Tailwind` 的配置。

若果這個文件不存在，你可以手動添加一個 `tailwind.config.(js|cjs|mjs)` 文件到專案的根目錄中，整合套件將會使用這個文件的配置。這對於已經在其他專案中配置 Tailwind 的人很有用。

### 配置整合套件

在整合 Tailwind CSS 到 Astro 專案時，預設情況下，整合套件會自動引入一個名為 `base.css` 的基本樣式文件，其中包含了一些基本的 CSS 設置，用來重置你的所有預設樣式，確保你的網站在不同瀏覽器上有一致的外觀。

如果你希望保留所有的預設樣式，請將 `applyBaseStyles` 設置為 `false：`

```ts
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // ...
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
});
```

接著在 `src/styles/global.css` 中添加以下 `tailwind` 的設定

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

最後，在 `pages/index.astro` 中的 `h1` 標籤上添加顏色樣式 `text-cyan-500`：
```html
<h1 class="text-cyan-500">🧑‍🚀 Hello, Astronaut!</h1>
```



<img src="/assets/images/astro/install-tailwind/002.jpg" width="50%" />

看到標題變藍色就表示安裝設定成功囉！

範例連結：https://stackblitz.com/edit/withastro-astro-zrenm4

---

## 總結

在這篇文章中，我們學習了如何使用 `Astro` 和 `Tailwind CSS` 來優化我們的 Blog。
我們安裝了 Tailwind CSS，設定了整合套件，並且實際應用了一些樣式設定。

