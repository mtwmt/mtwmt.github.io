---
title: 了解 Astro 的路由設定：路由 (Route)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/12
---

在前幾篇中我們介紹了 Astro 中的 `Page` 概念，今天讓我們更深入地探討路由，了解它在網站開發中的重要性以及如何在 Astro 中使用不同類型的路由。

## 什麼是路由？

在網站開發中，「路由」是指將特定的 URL 路徑映射到特定的網頁內容或功能。簡單來說，當用戶訪問某個 URL，我們希望顯示相應的內容或功能。例如，當用戶訪問 `https://mysite.com/about`，我們希望顯示 「關於我們」 的內容。

## 靜態路由

靜態路由是預先定義的路徑，對應到特定的頁面。在 Astro 中，您可以輕鬆地創建靜態路由。

首先，讓我們看一下如何使用 HTML 的 `<a>` 元素在不同頁面之間進行導航：

```html
<p>了解更多，請閱讀 <a href="/about/">關於 Astro！</a></p>
```

下面是一些靜態路由的範例，路徑對應於檔案的位置：

- `src/pages/index.astro `-> `mysite.com/`
- `src/pages/about.astro` -> `mysite.com/about`
- `src/pages/about/index.astro `-> `mysite.com/about`
- `src/pages/about/me.astro` -> `mysite.com/about/me`
- `src/pages/posts/1.md` -> `mysite.com/posts/1`

在 Astro 中，您無需單獨維護路由配置，當您將檔案添加到 `src/pages/` 目錄時，新的路由將自動為您創建。在靜態構建中，您可以使用 `build.format`(註 1) 配置選項來自定義輸出的檔案格式。

---

## 動態路由

動態路由允許我們根據特定的參數生成多個相關頁面。在 Astro 中，我們可以使用檔案名中的參數來實現這一點。

假設我們希望為部落格的每個作者生成個人頁面，我們可以這樣做：

檔案位置： `src/pages/authors/[author].astro`

```astro
---
export function getStaticPaths() {
  return [
    { params: { author: "author1" } },
    { params: { author: "author2" } },
    // ...其他作者
  ];
}

const { author } = Astro.params;
---

<div>歡迎來到作者 {author} 的個人頁面！</div>
```

在這個範例中，我們使用 `getStaticPaths` 函式為每個作者生成動態路由。在每個頁面中，我們可以使用 `Astro.params` 來訪問 `author` 參數的值。

### 動態頁面的多層次路由 (rest 參數)

以下是一個更複雜的範例，我們將使用嵌套的動態路由來實現多層次的頁面結構：

檔案位置：`src/pages/[...slug].astro`

```astro
---
export async function getStaticPaths() {
  const pages = [
    { slug: undefined, title: "首頁", text: "歡迎訪問首頁！" },
    { slug: "products", title: "產品", text: "我們有各種優質產品。" },
    { slug: "products/book", title: "書籍", text: "來看看我們的書籍吧。" },
  ];
  return pages.map(({ slug, title, text }) => {
    return {
      params: { slug },
      props: { title, text },
    };
  });
}

const { title, text } = Astro.props;
---

<html>
  <head>
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>{text}</p>
  </body>
</html>
```

在這個範例中，我們使用嵌套的動態路由，透過 `getStaticPaths` 函式為每個層次的頁面生成動態路由。在每個頁面中，我們使用 `Astro.props` 來訪問 `title` 和 `text` 屬性，並顯示在頁面上。

## 動態路由的優先順序

當多個路由可以匹配相同的 URL 路徑時，Astro 會根據一定的優先順序來決定使用哪個路由。以下是一些優先順序的規則：

- 靜態路由的優先順序高於其他路由
- 命名參數的動態路由的優先順序高於 rest 參數
- 預渲染的動態路由的優先順序高於伺服器端渲染的動態路由
- rest 參數的優先順序最低

透過這些規則，Astro 將確定使用哪個路由來構建頁面。

## 配置跳轉

有時您可能需要將讀者重新導向到新的頁面。您可以在 Astro 配置中定義重定向規則。

`astro.config.mjs`

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  redirects: {
    "/old-page": "/new-page",
    "/blog/[...slug]": "/articles/[...slug]",
  },
});
```

在上述範例中，我們定義了兩個重定向規則。您可以指定狀態碼和目標路徑，用於執行重定向。重定向規則將根據路徑匹配規則來執行。

## 分頁

Astro 支援內建的分頁功能，用於將大量數據分成多個頁面。分頁功能將生成包含前後頁 URL、總頁數等常見分頁屬性。

分頁路由的名稱應該使用和標準動態路由相同的 `[bracket]` 語法。以下是如何使用 `paginate()` 函式來生成分頁：

```astro
---
export async function getStaticPaths({ paginate }) {
  const astronautPages = [
    { astronaut: 'Neil Armstrong' },
    { astronaut: 'Buzz Aldrin' },
    // ...其他宇航員
  ];
  return paginate(astronautPages, { pageSize: 2 });
}

const { page } = Astro.props;
---

<h1>第 {page.currentPage} 頁</h1>
<ul>
  {page.data.map(({ astronaut }) => <li>{astronaut}</li>)}
</ul>

{page.url.prev ? <a href={page.url.prev}>上一頁</a> : null}
{page.url.next ? <a href={page.url.next}>下一頁</a> : null}
```

在這個範例中，我們使用 `paginate()` 函式生成了分頁。
Astro.props 中的 `page` 屬性包含分頁的相關信息，您可以使用它來顯示頁面內容以及前後頁的連結。

---

## 總結

以上就是 Astro 路由的深入了解。我們介紹了靜態路由、動態路由、配置跳轉和分頁等概念。這些都是在實際應用中非常實用的路由技巧，讓您可以更靈活地構建網站。

## 參考資料

[Astro Routing](https://docs.astro.build/en/core-concepts/routing/)

註 1:
`build.format` 是一個在 Astro 配置中的選項，用於控制每個頁面的輸出檔案格式。這個選項通常有兩個的值：

1. `file`：Astro 會為每個頁面生成一個獨立的 HTML 檔案，例如 /foo.html。
2. `directory`：Astro 會為每個頁面生成一個包含嵌套的 index.html 檔案的目錄，例如 /foo/index.html。

預設情況下，build.format 的值為 `directory`，這意味著每個頁面將生成一個目錄結構。如果將其設置為 `file`，則每個頁面將生成一個單獨的 `HTML` 檔案。

可以根據您的偏好和專案需求來調整，以選擇更適合的輸出檔案格式。