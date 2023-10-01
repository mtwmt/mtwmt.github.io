---
title: 認識 Astro Components (組件)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/06
---

今天，我們將進一步深入了解 Astro 的組件。

## 什麼是 Astro 組件？

Astro 組件是 Astro 專案的基本構建塊，它們是僅支持 HTML 的模板組件，沒有客戶端運行時。您可以通過文件擴展名 `.astro` 識別 Astro 組件。

### 特性：

- 非常靈活，可包含可重複使用的 UI 元素。
- 可以只包含一小段 HTML 代碼，例如一系列常見的 `<meta>` 標籤，用於方便地處理 SEO。
- 甚至可以包含整個頁面佈局。
  最重要的是，Astro 組件不會在客戶端渲染，而是在建置時或使用伺服器端渲染（SSR）時生成 HTML。
  這意味著您可以在組件前端程式碼中包含 JavaScript 代碼，但所有這些代碼都將在最終傳送到用戶瀏覽器的頁面中被剝離。這帶來一個更快的網站，預設情況下不添加任何 JavaScript 脚印。

當 Astro 組件需要客戶端交互性時，您可以添加標准的 HTML `<script>` 標籤或 `UI` 框架組件。

## Component 結構

一個 Astro 組件由兩個主要部分組成：`組件腳本（Component Script）`和`組件模板（Component Template）`。這兩個部分分別扮演著不同的角色，但合在一起提供了一個易於使用且表達力強大的框架，用於處理您可能想要構建的任何內容。

```Astro
---
// Component script (JavaScript)
---
<!-- Component Template (HTML + JS + CSS ) -->

```

### Component script (組件腳本)

Astro 使用代碼區塊 `---` 來識別 Astro 組件中的組件腳本。
如果使用過 Markdown，您可能已經對類似概念的 `frontmatter` 比較熟悉。
Astro 的組件腳本就是直接受到這個概念的啟發。這個部分可以用於以下目的：

- 導入其他 Astro 組件
- 導入其他框架組件，比如 React
- 導入數據，比如一個 JSON 文件
- 從 API 或數據庫中獲取內容
- 建立變數，將在模板(Template)中引用

### Component Template (元件樣板)

組件模板位於代碼區塊之下，決定了組件的 HTML 輸出。在組件模板中，您可以編寫純 HTML，並支持以下功能：

- JavaScript 表達式
- Astro 的 `<style>` 和 `<script>` 標籤
- 導入的組件
- 特殊的 `Astro` 指令
- 在組件腳本中定義的數據和變數可以在組件模板中使用，生成動態創建的 HTML。

---

## 建立一個 Button 元件

讓我們看一個實際的例子，如何建立一個 Astro 組件。

- 在 `src/components` 裡建立一個 `Button.astro` 檔案

```astro
---
const { title } = Astro.props;
---

<button>{title}</button>
```

- 現在，我們可以在 `src/pages` 中引用剛剛建立的 Button 組件。

```astro
---
import Button from "../components/Button.astro";
---

<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
```

---

## Component Props

在 Astro 組件中，`props` 用來作為屬性傳遞。這讓您可以輕鬆地向組件傳遞`數據`和`參數`，以自訂其行為。

---

## Slots

`<slot>` 元素是外部 HTML 內容的佔位符，允許您將子元素從其他檔案注入到組件模板中。
預設情況下，傳遞給組件的所有子元素都將在 `<slot>` 中呈現。

```astro
---
import Header from "./Header.astro";
import Logo from "./Logo.astro";
import Footer from "./Footer.astro";

const { title } = Astro.props;
---

<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot />
  <!-- 子元素將在這裡渲染 -->
  <Footer />
</div>
```

```astro
---
import Wrapper from "../components/Wrapper.astro";
---

<Wrapper title="Fred's Page">
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
</Wrapper>
```

這種模式是 Astro 佈局組件的基礎：整個 HTML 內容可以使用 <SomeLayoutComponent></SomeLayoutComponent> 標籤`包裹`起來，並傳送到組件中以在其中呈現公共頁面元素。

### 帶有名稱的 Slots

Astro 組件還可以具有帶有名稱的插槽。這使您只能將具有相應插槽名稱的 HTML 元素傳遞到插槽位置。

使用 `name` 屬性來命名插槽：

```astro
---
import Header from "./Header.astro";
import Logo from "./Logo.astro";
import Footer from "./Footer.astro";

const { title } = Astro.props;
---

<div id="content-wrapper">
  <Header />
  <slot name="after-header" />
  <!-- 子元素帶有 `slot="after-header"` 屬性將在這裡渲染 -->
  <Logo />
  <h1>{title}</h1>
  <slot />
  <!-- 子元素沒有 `slot` 屬性，或帶有 `slot="default"` 屬性將在這裡渲染 -->
  <Footer />
  <slot name="after-footer" />
  <!-- 子元素帶有 `slot="after-footer"` 屬性將在這裡渲染 -->
</div>
```

```astro
---
import Wrapper from "../components/Wrapper.astro";
---

<Wrapper title="Fred's Page">
  <img src="https://my.photo/fred.jpg" slot="after-header" />
  <h2>All about Fred</h2>
  <p>Here is some stuff about Fred.</p>
  <p slot="after-footer">Copyright 2022</p>
</Wrapper>
```

使用 `slot="my-slot"` 屬性在子元素上，指定要傳遞到組件中相應的 `<slot name="my-slot" />` 佔位符中。

> 請注意，帶有名稱的插槽必須是組件的直接子元素。您不能通過嵌套元素傳遞帶有名稱的插槽。

提示：帶有名稱的插槽也可以傳遞給 UI 框架組件！

### 插槽的回退內容

插槽還可以渲染回退內容。當沒有匹配的子元素傳遞給插槽時，`<slot>` 元素將渲染其自己的佔位符子元素。這是一個很有用的功能，可以確保即使沒有提供子元素，組件也能正常工作。

```astro
<!-- src/components/Wrapper.astro -->
---
import Header from "./Header.astro";
import Logo from "./Logo.astro";
import Footer from "./Footer.astro";

const { title } = Astro.props;
---

<div id="content-wrapper">
  <Header />
  <Logo />
  <h1>{title}</h1>
  <slot>
    <p>This is my fallback content, if there is no child passed into slot</p>
  </slot>
  <Footer />
</div>
```

### 轉移插槽

插槽可以轉移到其他組件，這在創建嵌套佈局時特別有用。

```astro
---
---

<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width" />
    <meta name="generator" content={Astro.generator} />
    <slot name="head" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

```astro
---
import BaseLayout from "./BaseLayout.astro";
---

<BaseLayout>
  <slot name="head" slot="head" />
  <slot />
</BaseLayout>
```

現在，傳遞給 `HomeLayout` 的預設和 `head` 插槽將轉移到 `BaseLayout` 父組件中。

```astro
---
import HomeLayout from "../layouts/HomeLayout.astro";
---

<HomeLayout>
  <title slot="head">Astro</title>
  <h1>Astro</h1>
</HomeLayout>
```

## HTML 組件

Astro 支援將 `.html` 文件作為組件導入和使用，或將這些文件放在 `src/pages/` 子目錄中作為頁面。如果您想要重用沒有使用框架建立的現有站點的代碼，或者確保您的組件不具有動態功能，您可能會使用 `HTML` 組件。

HTML 組件必須僅包含有效的 HTML，因此缺少關鍵的 Astro 組件功能：

- 它們不支援 `frontmatter`、伺服器端導入或動態表達式。
- 任何 `<script>` 標籤都將保持未打包，被視為 `is:inline`。
- 它們只能引用位於 `public/` 文件夾中的資源。

---

## 總結

今天我們瞭解了 Astro 組件的概念和結構。我們學會了如何建立和使用 Astro 組件，以及如何使用插槽在組件中注入不同的內容。

## 參考資料

[Astro Components](https://docs.astro.build/en/core-concepts/astro-components/)
