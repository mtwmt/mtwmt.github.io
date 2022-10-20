---
layout: tailwindcss
title: 使用 Angular 安裝 TailwindCSS
categories:
  - TailwindCss
tags:
  - TailwindCss
  - Angular
date: 2022/10/21
---

## 安裝環境

Angular 14.2.3
Node 14.16.1
編輯器 vscode

## 建立 Angular 新專案

```bash
ng new <project name>
cd <project name>
```

## 安裝 TailwindCSS

```bash
npm install -D tailwindcss postcss autoprefixer
```

寫這篇文章的時後，所安裝 TailwindCSS v3 版本
所以這裡會以下會是 TailwindCSS v3 版介紹

## 產生 tailwindcss 配置檔

```bash
npx tailwindcss init
```

在根目錄底下會多出一支 tailwind.config.js
所有 `TailwindCSS` 配置都在 `tailwind.config.js` 設定

## 設定 tailwindcss 配置

```ts
module.exports = {
  prefix: "",
  important: true,
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

在 tailwindcss v3 移除了 `mode: 'jit'` 設定,

### prefix: 前綴設定

```json
prefix: 'tw-',
```

```html
<!-- 生效 -->
<div class="tw-text-red-500 tw-font-bold">hello world</div>

<!-- 無效 -->
<div class="text-red-500">hello world</div>
```

### important: Tailwind 權重設定

設為 true 的話，有關於 T 中面 cstykele 後面都會加上 `!important`
適用情境：有時後需要修改到套件框架裡的樣式
![](https://i.imgur.com/SGCTSWJ.png)

### content: 設定需要使用到 Tailwind 的檔案路徑

### darkMode: 黑暗模式

```html
<!-- Dark mode 關閉 -->
<html>
  <body>
    <div class="bg-white dark:bg-black">這是白色背景</div>
  </body>
</html>

<!-- Dark mode 開啟 -->
<html class="dark">
  <body>
    <div class="bg-white dark:bg-black">這是黑色背景</div>
  </body>
</html>
```

### theme: 客製化設定

例：顏色設定

- 保留 Tailwind 預設顏色，新增顏色。

```js
theme: {
  extend: {
    colors: {
      brown: {
        50: "#fdf8f6",
        100: "#f2e8e5",
        200: "#eaddd7",
        300: "#e0cec7",
        400: "#d2bab0",
        500: "#bfa094",
        600: "#a18072",
        700: "#977669",
        800: "#846358",
        900: "#43302b",
      },
    },
  },
}
```

```js
theme: {
  colors: ({ colors }) => {
    return {
      ...colors,
      brown: {
        50: "#fdf8f6",
        100: "#f2e8e5",
        200: "#eaddd7",
        300: "#e0cec7",
        400: "#d2bab0",
        500: "#bfa094",
        600: "#a18072",
        700: "#977669",
        800: "#846358",
        900: "#43302b",
      },
    };
  },
  extend: {},
}
```

- 自訂義顏色
  tailwind，給使用者很多預設顏色，但有些用不太到，只需要幾種特定的顏色，與一些特定顏色

```js
//需引入 tailwind 顏色設定
const colors = require("tailwindcss/colors");

module.exports = {
  ...略
  theme: {
    colors: {
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.yellow,
      brown: {
        50: "#fdf8f6",
        100: "#f2e8e5",
        200: "#eaddd7",
        300: "#e0cec7",
        400: "#d2bab0",
        500: "#bfa094",
        600: "#a18072",
        700: "#977669",
        800: "#846358",
        900: "#43302b",
      },
    },
  },
  plugins: [],
};
```

```js
module.exports = {
  ...略
  theme: {
    colors: ({ colors }) => {
      return {
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        yellow: colors.yellow,
        brown: {
          50: "#fdf8f6",
          100: "#f2e8e5",
          200: "#eaddd7",
          300: "#e0cec7",
          400: "#d2bab0",
          500: "#bfa094",
          600: "#a18072",
          700: "#977669",
          800: "#846358",
          900: "#43302b",
        },
      };
    },
    extend: {},
  },
  plugins: [],
};
```

---

## 初始化 tailwind

在 `./src/styles.css` 或 `./src/styles.scss` 引入樣式

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 開始使用

```html
<h1 class="text-3xl font-bold underline">Hello world!</h1>
```

完成！

---

## 出現 SassError

在一個專案裡 通常會有很多機率也會使用到其他框架，雖然這範疇不算是屬於 `tailwindcss` 裡。
當出現 `SassError: @use rules must be written before any other rules.` 時

解決方式：
必須將引用 scss 檔的路徑 `@use '路徑'` 放置最上面

---

## vscode 警示排除

檔案 => 喜好設定 => 設定

![](assets/images/tailwindcss/tailwind_ng_install/NGmLsWT.png)

分別在 CSS、LESS、SCSS 裡都改為 `ignore`
![](assets/images/tailwindcss/tailwind_ng_install/MSsV3K4.png)

或是在 setting.json 裡加上這幾行

```json
"css.lint.unknownAtRules": "ignore",
"scss.lint.unknownAtRules": "ignore",
"less.lint.unknownAtRules": "ignore"
```

---

## vscode 必要套件安裝

[Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

![](assets/images/tailwindcss/tailwind_ng_install/installsense.jpg)

---

## Prettier 自動排序

[Automatic class sorting with Prettier](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)

需安裝 prettier 套件 可到 [vscode：Prettier 套件](https://mtwmt.com/blog/vscode/vscode_prettier) 看介紹

### 安裝

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

安裝後 prettier 也會幫忙格式化 tailwindcss 囉

