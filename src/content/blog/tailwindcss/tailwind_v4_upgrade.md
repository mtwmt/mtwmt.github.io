---
title: "Astro + TailwindCSS v4 升級實戰：從 v3 到 v4 的完整遷移指南"
date: 2025-10-04
tags: ["tailwindcss", "astro", "css"]
categories: ["tailwindcss"]
---

## 前言

最近將部落格從 TailwindCSS v3.4.18 升級到 v4.1.14，過程中踩了不少坑，特別是自訂顏色完全消失的問題讓我困擾了很久。這篇文章記錄完整的升級過程和解決方案，希望能幫助到有相同需求的朋友。

## 升級概述

**專案環境：**
- Astro 5.14.1
- TailwindCSS 3.4.18 → 4.1.14
- 使用 SCSS 作為樣式預處理器
- 有大量自訂 primary 顏色

**主要變更：**
- `@astrojs/tailwind` → `@tailwindcss/vite`
- `tailwind.config.js` → CSS-based 配置
- Sass `@import` → `@reference` 指令

## 第一階段：基本升級

### 1. 安裝新版本

```bash
npm install tailwindcss@4.1.14 @tailwindcss/vite@4.1.14
npm uninstall @astrojs/tailwind
```

### 2. 更新 Astro 配置

**astro.config.mjs：**

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite'; // 新的 Vite 插件

export default defineConfig({
  site: 'https://mtwmt.com',
  integrations: [
    sitemap(),
    mdx(),
    icon({
      include: {
        'grommet-icons': ['*'],
        // ... 其他 icon 集
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()], // 在 vite 中使用
  },
  prefetch: true,
});
```

**重要：** TailwindCSS v4 不再作為 Astro integration，改為 Vite plugin。

### 3. 刪除舊配置

```bash
rm tailwind.config.cjs  # 不再需要 JS 配置檔
```

## 第二階段：處理 Sass 衝突

### 問題：自訂顏色完全消失

升級後發現所有 `bg-primary-500`、`text-primary-700` 等自訂顏色都不見了！

**根本原因：**
TailwindCSS v4 **不支援 Sass 預處理器**處理 `@theme` 指令。當 Sass 預處理 `@import "tailwindcss"` 時，會破壞 TailwindCSS 的元數據，導致自訂顏色的 utility classes 無法生成。

### 解決方案：完全改用純 CSS

**最終策略：** 放棄在主樣式表使用 SCSS，改用純 CSS + TailwindCSS v4 特性。

#### 1. 建立 `tailwind.css`

```css
/* src/styles/tailwind.css */
@import "tailwindcss";

/* 定義 dark mode variant - 當 html 有 .dark class 時生效 */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Font families - 注意：使用 --font-* 而非 --font-family-* */
  --font-dosis: "Dosis", sans-serif;

  /* Primary color palette */
  --color-primary-50: #e0f5f5;
  --color-primary-100: #b3e6e6;
  --color-primary-200: #80d5d5;
  --color-primary-300: #4dc4c4;
  --color-primary-400: #26b7b7;
  --color-primary-500: #00aaaa;
  --color-primary-600: #00a3a3;
  --color-primary-700: #009999;
  --color-primary-800: #009090;
  --color-primary-900: #007f7f;

  /* Additional shades */
  --color-primary-a100: #adffff;
  --color-primary-a200: #7affff;
  --color-primary-a400: #47ffff;
  --color-primary-a700: #2dffff;

  /* Light color palette */
  --color-light-50: #fff;
  --color-light-100: #f5f5f5;
  --color-light-200: #ddd;
  --color-light-300: #717171;
  --color-light-400: #444;
  --color-light-500: #040404;
}
```

**重要：** 字體定義必須使用 `--font-dosis` 而非 `--font-family-dosis`，這樣才能正確生成 `font-dosis` utility class。

#### 2. 將 `global.scss` 轉換為 `global.css`

TailwindCSS v4 在獨立樣式表中使用 `@apply` 時，**無法套用自訂的 utility classes**（如 `text-default`、`bg-light`）。解決方法：

1. 將 `global.scss` 重新命名為 `global.css`
2. 展開所有 Sass 巢狀語法（`&` 符號）
3. 將自訂 utilities 移出 `@layer utilities`
4. 在 `@apply` 中無法使用的自訂 utilities，改用 CSS 變數

```css
/* src/styles/global.css */
@import url("https://fonts.googleapis.com/css?family=Dosis:300,400,500,600,700");
@import "./tailwind.css";

@layer base {
  * {
    @apply box-border;
  }

  :root {
    /* Runtime CSS 變數 */
    --color-default: #444;
    --color-light: #717171;
    --color-dark: #040404;
    --color-background: #fff;
    --color-light-background: #f5f5f5;
    --color-border: #ddd;
  }

  :root.dark {
    /* Dark mode 覆蓋 */
    --color-default: #fff;
    --color-light: #fff;
    --color-dark: #B4AFB6;
    --color-background: #1c1c1c;
    --color-light-background: #404040;
    --color-border: #666;
  }

  html,
  body {
    @apply relative m-0 h-full w-full p-0;
    scroll-behavior: smooth;
  }
}

/* 自訂 utilities - 移出 @layer 以便給 HTML 直接使用 */
.text-default {
  color: var(--color-default);
}
.bg-default {
  background-color: var(--color-background);
}
.border-default {
  border-color: var(--color-border);
}

/* Blog 文章樣式 - 混用 @apply 和 CSS 變數 */
.post {
  @apply text-base;
  color: var(--color-default); /* 不能用 @apply text-default */
}

.post h1 {
  @apply my-4 text-3xl;
  color: var(--color-default);
}

.post hr {
  @apply my-8;
  border-color: var(--color-border); /* 不能用 @apply border-default */
}
```

**關鍵差異：**
- ❌ **不能用** `@apply text-default`（自訂 utility）
- ✅ **可以用** `@apply text-base`（TailwindCSS 內建 utility）
- ✅ **可以用** `@apply bg-primary-500`（`@theme` 定義的顏色）
- ✅ **改用** `color: var(--color-default)`（直接使用 CSS 變數）

#### 3. 更新引入順序

**BaseHead.astro：**

```astro
---
import '../styles/tailwind.css';  // 先載入 TailwindCSS
import '../styles/global.css';     // 後載入全域樣式（已改為 .css）
---
```

## 第三階段：處理組件中的 @apply

### 問題：組件中的 @apply 報錯

在 Astro 組件的 `<style>` 標籤中使用 `@apply` 時，會出現錯誤：

```
Cannot apply unknown utility class `lg:translate-x-0`.
Are you using CSS modules or similar and missing `@reference`?
```

### 解決方案：使用 @reference 指令

好消息！**組件中的 `<style>` 標籤仍可使用 SCSS**，只需加上 `@reference`：

**Header.astro：**

```astro
<style is:global lang="scss">
  @reference "../styles/tailwind.css";

  .nav-toggle:checked {
    & ~ header {
      #hamburger > span {
        @apply rotate-180 bg-transparent;
        @apply before:translate-y-2.5 before:rotate-45;
        @apply after:-translate-y-2.5 after:-rotate-45;
      }
      > div {
        @apply -translate-x-80 lg:translate-x-0;
      }
    }
  }
</style>
```

**為什麼需要 @reference？**

- Astro 的 `<style>` 標籤會被獨立處理成 CSS 模組
- TailwindCSS 編譯器無法看到其他檔案中的 utility classes 定義
- `@reference` 告訴 TailwindCSS：「去 `tailwind.css` 找 utility classes 的定義」
- **不會重複載入**，只是提供參考路徑
- **仍可使用 Sass 語法**（如 `&` 巢狀）

**重要：** 組件中的 SCSS 是安全的，因為 Astro 會先用 Sass 編譯，再交給 TailwindCSS 處理。只有**獨立的 `.scss` 檔案搭配 `@import "tailwindcss"`** 才會有問題

## 第四階段：避免 Sass 棄用警告

### 問題：Sass @import 棄用警告

如果在 `.scss` 檔案中使用 `@import "tailwindcss"`，會看到：

```
Deprecation Warning [import]: Sass @import rules are deprecated
and will be removed in Dart Sass 3.0.0.
```

### 最終解決方案：改用純 CSS

將主樣式表從 `global.scss` 改為 `global.css` 後，這個警告完全消失了！

**為什麼？**
- `global.css` 是純 CSS，不經過 Sass 預處理器
- `@import "./tailwind.css"` 是標準 CSS @import，不會觸發 Sass 警告
- TailwindCSS v4 的 Vite plugin 會正確處理 CSS @import

### 組件中的 SCSS 仍可使用

**關鍵理解：**
```
✅ 組件 <style lang="scss"> + @reference     → 安全，可用 SCSS
❌ 獨立 .scss 檔案 + @import "tailwindcss"   → 警告，避免使用
✅ 獨立 .css 檔案 + @import "tailwindcss"    → 安全，推薦使用
```

這就是為什麼我們最終將 `global.scss` 改為 `global.css`，但組件中仍保留 `lang="scss"`

## 關鍵知識點總結

### 1. TailwindCSS v4 不支援 Sass 預處理器

**v3 的做法（已不適用）：**
```scss
@import "tailwindcss"; // Sass 會預處理這行
@theme { ... }         // 元數據會被破壞
```

**v4 的做法：**
- 將 `@import "tailwindcss"` 和 `@theme` 放在**純 CSS 檔案**（`tailwind.css`）
- 主樣式表也改用純 CSS（`global.css`）
- SCSS 只用於組件的 `<style>` 標籤

### 2. @apply 的限制

**在 global.css 中：**
```css
/* ✅ 可以 @apply TailwindCSS 內建 utilities */
.post {
  @apply text-base my-4;
}

/* ✅ 可以 @apply @theme 定義的顏色 */
.btn {
  @apply bg-primary-500 text-white;
}

/* ❌ 不能 @apply 自訂 utilities */
.post {
  @apply text-default;  /* 會報錯 */
  color: var(--color-default);  /* 改用這個 */
}
```

### 3. @reference 的作用

- **不是載入檔案**，而是告訴編譯器「去哪裡找定義」
- 只在組件的 `<style>` 標籤中需要
- 不會增加輸出檔案大小
- **允許組件繼續使用 SCSS 語法**

### 4. 正確的檔案組織

```
src/styles/
├── tailwind.css      # TailwindCSS 配置（純 CSS + @theme）
└── global.css        # 全域樣式（純 CSS + @apply）

src/components/
└── Header.astro      # <style lang="scss"> + @reference
```

### 5. 字體定義的陷阱

```css
/* ❌ 錯誤 - 無法生成 font-dosis utility */
@theme {
  --font-family-dosis: "Dosis", sans-serif;
}

/* ✅ 正確 - 可生成 font-dosis utility */
@theme {
  --font-dosis: "Dosis", sans-serif;
}
```

## 完整的最佳實踐

### 1. tailwind.css（TailwindCSS 配置）

```css
/* src/styles/tailwind.css */
@import "tailwindcss";

@theme {
  /* 字體 - 注意：--font-* 而非 --font-family-* */
  --font-dosis: "Dosis", sans-serif;

  /* 顏色 */
  --color-primary-500: #00aaaa;
  --color-primary-700: #009999;
}
```

### 2. global.css（全域樣式 - 已改為純 CSS）

```css
/* src/styles/global.css */
@import url("https://fonts.googleapis.com/css?family=Dosis:300,400,500,600,700");
@import "./tailwind.css";

@layer base {
  :root {
    /* 自訂 CSS 變數 */
    --color-default: #444;
    --color-background: #fff;
  }

  :root.dark {
    --color-default: #fff;
    --color-background: #1c1c1c;
  }

  html {
    @apply relative m-0 h-full w-full p-0;
  }
}

/* 自訂 utilities - 放在 @layer 外面 */
.text-default {
  color: var(--color-default);
}

/* Blog 樣式 - 混用 @apply 和 CSS 變數 */
.post {
  @apply text-base;
  color: var(--color-default);  /* 不能用 @apply text-default */
}

.post h1 {
  @apply my-4 text-3xl;
  color: var(--color-default);
}

.btn {
  @apply bg-primary-500 text-white;  /* 可以用 @theme 的顏色 */
}
```

**重點：**
- ✅ 外層 `@import` 放在最前面
- ✅ 自訂 utilities 定義在 `@layer` 外面（供 HTML 使用）
- ✅ `@apply` 只用於 TailwindCSS 內建或 `@theme` 定義的 utilities
- ✅ 自訂 utilities 改用 `color: var(--...)` 等 CSS 變數

### 3. BaseHead.astro（入口）

```astro
---
import '../styles/tailwind.css';  // 先載入 TailwindCSS
import '../styles/global.css';     // 後載入全域樣式（已改為 .css）
---
```

### 4. 組件中使用 @apply（可繼續用 SCSS）

```astro
<!-- Header.astro -->
<style is:global lang="scss">
  @reference "../styles/tailwind.css";

  .nav-toggle:checked {
    & ~ header {  /* 仍可使用 Sass 巢狀 */
      > div {
        @apply -translate-x-80 lg:translate-x-0;
      }
    }
  }
</style>
```

**組件中的優勢：**
- ✅ 可繼續使用 `lang="scss"`
- ✅ 支援 Sass 巢狀語法（`&`、`>`）
- ✅ 使用 `@reference` 即可 `@apply`
- ✅ 不會有 Sass 棄用警告

## 驗證升級成功

### 1. 建置測試

```bash
npm run build
```

應該看到：
```
18:48:17 [build] 263 page(s) built in 6.29s
18:48:17 [build] Complete!
```

沒有任何 Sass 棄用警告！

### 2. 檢查顏色是否正常

```bash
npm run preview
# 或
npm run dev
```

打開瀏覽器檢查：
- ✅ Primary 顏色（青色）正常顯示
- ✅ Blog 文章樣式正確
- ✅ 暗黑模式切換正常
- ✅ 自訂字體載入成功

### 3. 檢查 CSS 輸出（可選）

```bash
# 檢查 primary 顏色變數
cat dist/_astro/*.css | grep "color-primary-500"

# 檢查字體定義
cat dist/_astro/*.css | grep "font-dosis"
```

## 常見問題 FAQ

### Q1: 為什麼不能在 global.scss 中使用 @theme？

**A:** Sass 預處理器會破壞 TailwindCSS 的元數據，導致自訂顏色的 utility classes 無法生成。必須將 `@theme` 放在純 CSS 檔案（`tailwind.css`）中。

### Q2: 一定要把 global.scss 改成 global.css 嗎？

**A:** 是的。獨立的 `.scss` 檔案使用 `@import "tailwindcss"` 會觸發 Sass 棄用警告，且在 `@apply` 自訂 utilities 時會失敗。改為 `.css` 後這些問題都解決了。

### Q3: 改成 global.css 後還能用 Sass 語法嗎？

**A:** 主樣式表不行，但**組件中可以**！在組件的 `<style lang="scss">` 中加上 `@reference`，就能繼續使用 Sass 巢狀語法和 `@apply`。

### Q4: @reference 會重複載入 TailwindCSS 嗎？

**A:** 不會。`@reference` 只是告訴編譯器去哪裡找定義，不會實際載入檔案內容。最終只會輸出一份 TailwindCSS。

### Q5: 為什麼 @apply text-default 會報錯？

**A:** TailwindCSS v4 的 `@apply` 只能使用：
- ✅ TailwindCSS 內建 utilities（`text-base`、`flex` 等）
- ✅ `@theme` 定義的顏色（`bg-primary-500`）
- ❌ 自訂的 CSS classes（`text-default`、`bg-light`）

解決方法：將 `@apply text-default` 改為 `color: var(--color-default)`。

### Q6: font-dosis utility 為什麼無法生成？

**A:** TailwindCSS v4 字體定義必須使用 `--font-*` 格式：
```css
/* ❌ 錯誤 */
--font-family-dosis: "Dosis", sans-serif;

/* ✅ 正確 */
--font-dosis: "Dosis", sans-serif;
```

### Q7: 一定要用 @tailwindcss/vite 嗎？

**A:** 是的。TailwindCSS v4 不再支援舊的 `@astrojs/tailwind` integration，必須使用 Vite plugin。

## 升級效益

✅ **使用最新的 TailwindCSS v4 特性**
✅ **CSS-first 配置更直觀**
✅ **保留 SCSS 的便利性**
✅ **@reference 避免重複載入**
✅ **更好的 Vite 整合**

## 升級後的檔案結構總覽

```
src/
├── styles/
│   ├── tailwind.css       # TailwindCSS 配置（純 CSS）
│   │                       # - @import "tailwindcss"
│   │                       # - @theme { 自訂顏色、字體 }
│   │
│   └── global.css         # 全域樣式（純 CSS）
│                           # - @import "./tailwind.css"
│                           # - @layer base { ... }
│                           # - 自訂 utilities
│                           # - .post 等樣式
│
├── components/
│   ├── BaseHead.astro     # import '../styles/tailwind.css'
│   │                       # import '../styles/global.css'
│   │
│   └── Header.astro       # <style lang="scss" is:global>
│                           #   @reference "../styles/tailwind.css"
│                           #   仍可使用 Sass 巢狀語法
│
└── layouts/
    └── ContentLayout.astro # <style lang="scss" is:global>
                             #   @reference "../styles/tailwind.css"
```

## 結語

TailwindCSS v4 的升級看似簡單，但與 Sass 的相容性問題容易讓人卡關數小時。關鍵是理解：

1. **TailwindCSS v4 不支援 Sass 預處理 `@theme`** → 必須放在純 CSS 檔案
2. **獨立樣式表改用純 CSS** → 避免 Sass 警告和 `@apply` 問題
3. **組件仍可用 SCSS + @reference** → 保留巢狀語法的便利性
4. **@apply 只能用 TailwindCSS/`@theme` 的 utilities** → 自訂的改用 CSS 變數
5. **字體定義用 `--font-*`** → 才能生成對應 utility class

經過這次升級，我深刻體會到 TailwindCSS v4 的 **CSS-first** 哲學：配置回歸 CSS，減少對預處理器的依賴。雖然過程曲折，但最終的架構更清晰、更符合現代標準。

希望這篇文章能幫助你順利完成升級，避免踩到相同的坑！如果有任何問題，歡迎在下方留言討論。

## 參考資源

- [TailwindCSS v4 官方文件](https://tailwindcss.com/docs)
- [TailwindCSS v4 升級指南](https://tailwindcss.com/docs/upgrade-guide)
- [@reference 指令說明](https://tailwindcss.com/docs/functions-and-directives#reference-directive)
- [Astro 整合 TailwindCSS](https://docs.astro.build/en/guides/styling/)