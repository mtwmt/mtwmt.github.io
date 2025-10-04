---
title: 認識 Astro Layouts (佈局)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/08
---

## 什麼是佈局（Layouts）？

在 Astro 中，佈局是一種特殊的組件，旨在提供可重複使用的 UI 結構，通常用於頁面模板。我們經常使用 "佈局" 一詞來指稱提供頁面中共享元素的 Astro 組件，例如`頁首 (header)`、`導航欄`和`頁尾 (footer)`。一個典型的 Astro 佈局組件可以為 ` Astro``、Markdown ` 或 `MDX` 頁面提供以下內容：

- 頁面外殼（包括 `<html>`、`<head>` 和 `<body>` 標籤）。
- 一個 `<slot />`，用於指定個別頁面內容應該注入的位置。

但是，佈局組件並不限於此！它們可以像任何其他 Astro 組件一樣接受 props，導入和使用其他組件，包括 UI 框架組件和客戶端腳本。您甚至可以將佈局組件視為部分 UI 模板，它們不必提供完整的頁面外殼。

## 創建佈局組件

通常，佈局組件被放置在 Astro 項目的 `src/layouts` 目錄中以便更好地組織代碼，但這不是強制性的。您可以選擇將它們放在項目的任何位置。如果需要，您還可以將佈局組件與頁面一起放在一起，只需在佈局名稱前添加下劃線 `_`。

以下是一個 layout 的範例：

```astro
<!-- layouts/MySiteLayout.astro -->
---
import BaseHead from '../components/BaseHead.astro';
import Footer from '../components/Footer.astro';
const { title } = Astro.props
---
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <BaseHead title={title}/>
  </head>
  <body>
    <nav>
      <a href="#">Home</a>
      <a href="#">Posts</a>
      <a href="#">Contact</a>
    </nav>
    <h1>{title}</h1>
    <article>
      <slot /> <!-- 個別頁面內容將在此處插入 -->
    </article>
    <Footer />
  </body>
</html>
```

接著使用上面的佈局組件，只需在頁面內容中引用它們即可，並傳遞所需的 `props`。

```astro
---
import MySiteLayout from '../layouts/MySiteLayout.astro';
---
<MySiteLayout title="Home Page">
  <p>My page content, wrapped in a layout!</p>
</MySiteLayout>
```

## Markdown/MDX 佈局

佈局對於 Markdown 和 MDX 頁面特別有用，否則這些頁面將沒有任何頁面格式。

在 Markdown 和 MDX 文件中，可以使用 layout 屬性來指定頁面使用的佈局組件。這個 layout 屬性可以接受來自頁面 frontmatter 的值，讓您可以動態指定佈局。

以下是一個示例 Markdown 文件中的 `layout` 屬性的使用：

```markdown
---
layout: ../layouts/BaseLayout.astro
title: "Hello, World!"
author: "Matthew Phillips"
date: "09 Aug 2022"
---
```

### Markdown/MDX 佈局組件通常包括以下元素：

- Frontmatter 屬性：用於訪問 Markdown 或 MDX 文檔的 `frontmatter` 和其他數據。
- 默認的 `<slot />`：指示 Markdown/MDX 內容應該呈現的位置。

以下是一個示例 `Markdown` 佈局組件的結構：

```astro
---
// 1. frontmatter prop用於訪問frontmatter和其他數據
const { frontmatter } = Astro.props;
---
<html>
  <head>
    <!-- 在此處添加其他Head元素，例如樣式和meta標籤。 -->
    <title>{frontmatter.title}</title>
  </head>
  <body>
    <!-- 在此處添加其他UI組件，例如常見的頁首和頁尾。 -->
    <h1>{frontmatter.title} by {frontmatter.author}</h1>
    <!-- 2. 渲染的HTML將傳遞到默認插槽。 -->
    <slot />
    <p>Written on: {frontmatter.date}</p>
  </body>
</html>
```

### Markdown 佈局 Props

對於 Markdown 和 MDX 佈局，Astro 提供了一系列有用的 props，這些 props 允許您輕鬆訪問有關頁面的信息。
以下是這些 props 的詳細說明：

- file: 該文件的絕對路徑（例如 /home/user/projects/.../file.md）。
- url: 如果是頁面，則是頁面的 URL（例如 /en/guides/markdown-content）。
- frontmatter: 包含來自 Markdown 或 MDX 文檔的所有 frontmatter 的對象。
- frontmatter.file: 與頂級 file 屬性相同。
- frontmatter.url: 與頂級 url 屬性相同。
- headings: 包含 Markdown 或 MDX 文檔中的標題（從 h1 到 h6）的列表，每個標題都具有相關聯的元數據。該列表遵循以下類型：{ depth: number; slug: string; text: string }[]。
- rawContent(): 一個函數，返回原始 Markdown 文檔的字符串。（僅限 Markdown）
- compiledContent(): 一個函數，返回已編譯為 HTML 字符串的 Markdown 文檔。（僅限 Markdown）

以下是範例是 `Markdown` 或 `MDX` 佈局中可能會傳遞給 Astro.props 的資訊：

```astro
Astro.props = {
  file: "/home/user/projects/.../file.md",
  url: "/en/guides/markdown-content/",
  frontmatter: {
    /** 部落格文章的frontmatter */
    title: "Astro 0.18 Release",
    date: "Tuesday, July 27 2021",
    author: "Matthew Phillips",
    description: "Astro 0.18 is our biggest release since Astro launch.",
    /** 生成的值 */
    file: "/home/user/projects/.../file.md",
    url: "/en/guides/markdown-content/"
  },
  headings: [
    {
      "depth": 1,
      "text": "Astro 0.18 Release",
      "slug": "astro-018-release"
    },
    {
      "depth": 2,
      "text": "Responsive partial hydration",
      "slug": "responsive-partial-hydration"
    }
    /* ... */
  ],

  /** 僅適用於Markdown */
  rawContent: () => "# Astro 0.18 Release\nA little over a month ago, the first public beta [...]",
  compiledContent: () => "<h1>Astro 0.18 Release</h1>\n<p>A little over a month ago, the first public beta [...]</p>",
}
```

### 手動引用佈局 (MDX)

如果需要向 MDX 佈局傳遞一些不能或不應存在於 frontmatter 中的信息，您可以導入並像任何其他組件一樣使用 `<Layout />` 組件，然後傳遞這些額外的 props。
如以下範例：

```astro
---
layout: '../../layouts/BaseLayout.astro'
title: 'My first MDX post'
publishDate: '21 September 2022'
---
import BaseLayout from '../../layouts/BaseLayout.astro';

function fancyJsHelper() {
  return "Try doing that with YAML!";
}

<BaseLayout title={frontmatter.title} fancyJsHelper={fancyJsHelper}>
  Welcome to my new Astro blog, using MDX!
</BaseLayout>
```

然後，您可以在佈局中通過 `Astro.props` 使用這些值，MDX 內容將注入到您的 `<slot />` 組件所指定的位置中。

如下：

```astro
---
const { title, fancyJsHelper } = Astro.props;
---
<!-- -->
<h1>{title}</h1>
<slot /> <!-- 個別頁面內容將在此處注入 -->
<p>{fancyJsHelper()}</p>
<!-- -->
```

### 使用一個佈局用於.md，.mdx 和.astro

一個 Astro 佈局組件可以編寫為接收來自`.md` 和`.mdx` 文件的 frontmatter 對象，以及來自.astro 文件傳遞的任何命名 props。

在以下示例中，佈局將從頂層 frontmatter 或 Astro.props 中顯示頁面標題：

```astro
---
const { title } = Astro.props.frontmatter || Astro.props;
---
<html>
  <head></head>
  <body>
    <h1>{title}</h1>
    <slot />
  </body>
</html>
```

## 嵌套佈局

佈局組件不必包含整個頁面的 HTML，它們可以進一步拆分為較小的組件，以實現更靈活的頁面模板。這在需要共享代碼時非常有用。
例如，您可以使用一個名為 `BlogPostLayout.astro` 的佈局組件為文章的標題、日期和作者添加樣式，然後再使用一個名為 `BaseLayout.astro` 的佈局組件處理頁面的其餘部分，例如導航、頁尾、SEO 元標籤、全局樣式和字體。這樣的方式，您可以輕鬆將從文章接收的 props 傳遞到其他佈局，就像處理任何其他嵌套組件一樣。

```astro
---
import BaseLayout from './BaseLayout.astro'
const {frontmatter} = Astro.props;
---
<BaseLayout url={frontmatter.url}>
  <h1>{frontmatter.title}</h1>
  <h2>Post author: {frontmatter.author}</h2>
  <slot />
</BaseLayout>
```

---

## 總結

本文介紹了 Astro 的佈局系統，用於提供可重複使用的 UI 結構，通常用於頁面模板。您已經學會了如何在 Astro 項目中定義佈局，並如何透過 frontmatter 或 props 從 Markdown、MDX 和 Astro 頁面中訪問這些佈局。這將有助於更好地組織您的代碼，使您的項目更加靈活和易於維護。

## 參考資料

[Astro Layouts](https://docs.astro.build/en/core-concepts/layouts/)
