---
title: 實作 Astro Tailwind CSS 變數設定
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/17
---

## 建立 Dark Mode 所需的 CSS 變數

在這篇文章中，我們將學習如何建立 Dark Mode 所需的 CSS 變數，以使我們的網站能夠在不同模式下切換。

## CSS 變數設定

首先，在 `styles/global.css` 文件中，我們需要宣告一組 CSS 變數，用來定義 Dark Theme 和 Light Theme 的各種顏色和樣式設定。這樣，在切換模式時，我們只需更新這些變數，而不必修改每個元素的顏色。

```css
/* Dark Theme 設定 */
:root.dark {
  --color-background: #1c1c1c;
  --color-light-background: #404040;
  --color-text: #fff;
  --color-light-text: #fff;
  --color-dark-text: #b4afb6;
  --color-border: #3e3e3e;
  --accent: #00bfff;
  --accent-dark: #87ceeb;
  --gray-gradient: var(--color-border), 75%, #1c1c1c;
  --box-shadow: 0 2px 6px var(--color-light-text), 25%, 0 8px 24px var(--color-light-text),
    33%, 0 16px 32px var(--color-light-text), 33%;
}

/* Light Theme 設定 */
:root {
  --color-background: #fff;
  --color-light-background: #f5f5f5;
  --color-text: #444;
  --color-light-text: #717171;
  --color-dark-text: #040404;
  --color-border: #eaeaea;
  --accent: #2337ff;
  --accent-dark: #000d8a;
  --gray-gradient: var(--color-border), 25%, #fff;
  --box-shadow: 0 2px 6px var(--color-light-text), 25%, 0 8px 24px var(--color-light-text),
    33%, 0 16px 32px var(--color-light-text), 33%;
}
```

接下來，在 `tailwind.config.cjs` 檔案中，我們將添加以下設定，以便在 `Tailwind CSS` 中使用這些 CSS 變數。

```js
module.exports = {
  // ...其他設定
  theme: {
    extend: {
      textColor: {
        default: `var(--color-text)`,
        light: `var(--color-light-text)`,
        dark: `var(--color-dark-text)`,
      },
      backgroundColor: {
        default: `var(--color-background)`,
        light: `var(--color-light-background)`,
        dark: `var(--color-dark-text)`,
        border: `var(--color-border)`,
      },
      borderColor: {
        default: `var(--color-border)`,
      },
    },
  },
};
```

以上設定在其他框架上也適用

---

## 變數應用

接下來，我們需要在項目中應用這些變數，以使它們在不同模式下生效。請根據您的項目需求，選擇性地更新以下預設變數：

使用 vscode 的取代功能來調整
<img src="/assets/images/astro/tailwind-setting/001.jpg" />
<img src="/assets/images/astro/tailwind-setting/002.jpg" />

`rgb(var(--black))` => `var(--color-dark-text)`
`var(--black)` => `var(--color-dark-text)`
`rgb(var(--gray))` => `var(--color-light-text)`
`rgb(var(--gray-light))` => `var(--color-light-background)`
`rgb(var(--gray-dark))` => `var(--color-text)`

同時，調整 `global.css` 中的背景設定：

將 `background-size: 100% 600px` 調整為 `background-size: 100%;`

最後，根據您的喜好進一步調整樣式以獲得最適合的外觀。

---

## 總結

在本篇文章中，我們學到了如何建立 Dark Mode 所需的 CSS 變數，以實現在網站中輕鬆切換不同的主題模式。這種做法可以增加網站的可維護性，並提供更好的用戶體驗。

今天，我們學到了以下內容：

- 如何宣告和使用 CSS 變數來管理主題風格
- 如何在 Tailwind CSS 中使用這些變數來設定文字顏色、背景色和邊框顏色
- 如何在不同模式下應用這些變數並調整外觀樣式

現在，您已經具備了建立自適應主題的基本知識，可以繼續開發您的項目，甚至添加 Dark Mode 功能！

今天比較簡單，因為會花比較多工在調整 css 顏色變數上
接著明天就要來做 dark mode 囉
