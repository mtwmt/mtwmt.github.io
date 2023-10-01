---
title: 了解 Astro 的樣式設定 (Style)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/10
---

昨天我們了解了 Astro 的樣版語法元素，今天我們將深入研究 Astro 中的樣式部分。

## Astro 中的樣式設定

在 Astro 中，要為元件或頁面模板設置樣式，只需添加 `<style>` 標籤即可。當您將 `<style>` 標籤放入 Astro 元件中時，Astro 會自動偵測 CSS 並處理樣式。

範例：

```css
/* src/components/MyComponent.astro */
<style>
  h1 { color: red; }
</style>
```

## 區域性樣式

Astro 的 `<style>` CSS 規則默認會自動進行區域性封裝。這表示這些樣式只會應用於元件內部的 HTML。在 Astro 元件內部編寫的 CSS 會自動封裝在元件內。

範例：

```css
 /* index.astro */
<style>
  h1 {
    color: red;
  }

  .text {
    color: blue;
  }
</style>
```

編譯成：

```css
<style>
  h1:where(.astro-HHNQFKH6) {
     color: red;
  }

  .text:where(.astro-HHNQFKH6) {
    color: blue;
  }
</style>
```

區域樣式不會外洩，也不會影響站點的其餘部分。在 Astro 中，可以使用低特定性的選擇器（例如 `h1 {}` 或 `p {}`），因為它們會在最終輸出中與範圍一起編譯。

## 全局樣式

雖然我們建議大多數元件使用區域性樣式，但你可能會找到一個合理的理由來寫全局、非區域性的 CSS。你可以使用 `<style is:global>` 屬性來取消自動 CSS 區域性封裝。

範例：

```css
 /* src/components/GlobalStyles.astro */
<style is:global>
  /* 不受限制，原封不動地傳遞給瀏覽器。
     適用於你網站上的所有 <h1> 標籤。 */
  h1 { color: red; }
</style>
```

## 通過 `<style>` 標籤混合全局和區域樣式

你也可以在同一個 <style> 標籤中混合全局和區域 CSS 規則，使用 :global() 選擇器。這是一個將 CSS 樣式應用於元件子元素的強大模式。

範例：

```html
<!-- src/components/MixedStyles.astro -->
<style>
  /* 區域樣式，僅對本元件有效。 */
  h1 {
    color: red;
  }
  /* 混合：僅對子元素中的 `h1` 生效。 */
  article :global(h1) {
    color: blue;
  }
</style>
<h1>標題</h1>
<article><slot /></article>
```

這是為像 blog 文章或帶有由 CMS 提供內容的文件這樣的事物設計樣式的好方法，其中內容位於 Astro 之外。但要小心：外觀因是否有特定父元件而不同的元件可能變得難以排除故障。

---

## 結合類別和 class:list

如果你需要動態地在元素上結合類別，你可以在 .astro 檔案中使用 class:list 工具屬性。

```astro
src/components/ClassList.astro
---
const { isRed } = Astro.props;
---
<!-- 如果 `isRed` 是真值，類別將是 "box red"。
     如果 `isRed` 是假值，類別將是 "box"。 -->
<div class:list={['box', { red: isRed }]}><slot /></div>

<style>
  .box { border: 1px solid blue; }
  .red { border-color: red; }
</style>
```

---

## CSS 變數

Astro 的 `<style>` 標籤可以參考頁面上可用的任何 CSS 變數。您還可以直接從組件前置數據中使用 define:vars 指令傳遞 CSS 變數。

範例：

```astro
---
const foregroundColor = "rgb(221 243 228)";
const backgroundColor = "rgb(24 121 78)";
---
<style define:vars={{ foregroundColor, backgroundColor }}>
  h1 {
    background-color: var(--backgroundColor);
    color: var(--foregroundColor);
  }
</style>
<h1>你好</h1>
```

## 將類別傳遞給子元件

在 Astro 中，HTML 屬性（如 class）不會自動傳遞給子元件。相反，你可以在子元件中接受一個 class 屬性，並將它應用於根元素。

範例：

```astro
<!-- src/components/MyComponent.astro -->
---
const { class: className } = Astro.props;
---
<div class={className}>
  <slot/>
</div>
```

```astro
<!-- src/pages/index.astro -->
---
import MyComponent from "../components/MyComponent.astro"
---
<style>
  .red {
    color: red;
  }
</style>
<MyComponent class="red">這將是紅色的！</MyComponent>
```

這種模式使你可以直接為子元件設計樣式。Astro 將父元件的區域性類別名稱（例如 astro-HHNQFKH6）通過 class 屬性自動傳遞給子元件，包括子元件在其父元件的範圍內。

---

## 內嵌樣式

可以使用 style 屬性在 HTML 元素上設計行內樣式。這可以是一個 CSS 字串或一個包含 CSS 屬性的物件：

```astro
<!-- src/pages/index.astro -->
<!-- 以下兩種寫法等效： -->
<p style={{ color: "brown", textDecoration: "underline" }}>我的文字</p>
<p style="color: brown; text-decoration: underline;">我的文字</p>
```

---

## 外部樣式

有兩種方法可以引入外部的全局樣式表：使用 ESM 引入來自專案源代碼的文件，以及使用絕對 URL 鏈接引入來自 public/ 目錄中的文件，或者從專案外部的位置引入。

引入本地樣式表
使用 ESM 引入來在 Astro 元件的 `frontmatter` 中引入樣式表。CSS 引入與其他 ESM 引入一樣，在 `Astro` 元件中以相對於元件的路徑引用，必須在元件腳本的頂部進行引入，與其他引入一起。

```astro
<!-- src/pages/index.astro -->
---
<!-- Astro 將自動為你打包和優化這個 CSS
對於像 .scss、.styl 等的預處理器文件也一樣適用 -->
import '../styles/utils.css';
---
<html><!-- 你的頁面內容在這裡 --></html>
```

ESM 引入的 CSS 在任何 JavaScript 文件中都受支持，包括像 React 和 Preact 這樣的 JSX 元件。這對於為 React 元件編寫粒度更細的、每個元件的樣式非常有用。

---

## 從 npm 封包中引入樣式表

從外部的 npm 封包中引入樣式表，也可以這樣做。這對於像 Open Props 這樣的工具很常見。如果封包建議使用文件擴展名（例如 package-name/styles.css 而不是 package-name/styles），則這樣做與引入本地樣式表類似：

```astro
src/pages/random-page.astro
---
import 'package-name/styles.css';
---
<html><!-- 你的頁面內容在這裡 --></html>
```

如果封包不建議使用文件擴展名（例如 `package-name/styles`），則需要首先更新你的 Astro 配置！

假設你從名為 `package-name` 的封包中引入名為 `normalize` 的 CSS 文件（省略了文件擴展名）。為了確保我們可以正確地預渲染你的頁面，將 package-name 添加到 vite.ssr.noExternal 陣列中：

```js
astro.config.mjs;
import { defineConfig } from "astro/config";

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ["package-name"],
    },
  },
});
```

現在，你可以自由地引入 `package-name/normalize`。這將與其他本地樣式表一樣，由 Astro 打包和優化。

```astro
src/pages/random-page.astro
---
import 'package-name/normalize';
---
<html><!-- 你的頁面內容在這裡 --></html>
```

## 通過 "link" 標籤加載靜態樣式表

你還可以使用 <link> 元素在頁面上加載樣式表。這應該是對一個位於你的 /public 目錄中的 CSS 文件的絕對 URL 路徑，或者是一個外部網站的 URL。不支持相對的 `<link>` href 值。

```astro
<!-- src/pages/index.astro -->
<head>
  <!-- 本地：/public/styles/global.css -->
  <link rel="stylesheet" href="/styles/global.css" />
  <!-- 外部 -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/themes/prism-tomorrow.css" />
</head>
```

---

## 總結

Astro 提供了豐富且靈活的方式來處理樣式和 CSS，無論是在元件內部還是全局範圍。適當地選擇區域性和全局性的樣式，將幫助你在項目中實現一致性和易於維護的樣式。在開始使用時，考慮你的項目需求，並選擇最適合的樣式設計模式。

## 參考資料

[Astro Styles & CSS](https://docs.astro.build/en/guides/styling/)
