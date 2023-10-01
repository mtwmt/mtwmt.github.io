---
title: 實作 Astro 功能：文章搜尋(Search)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/27
---

當網站內容一多的話，很難快速找到我們想要的文章。
搜尋功能可以幫助用戶輕鬆找到所需的內容，提升使用者體驗，並提高網站的互動性和價值。
今天，將介紹如何在 Astro 框架中實現一個基本的搜尋系統，以加強你的網站。

以下是完成後的頁面，分別是搜尋後顯示的列表與未搜尋到的畫面

<img src="/assets/images/astro/search/final1.jpg" width="70%"/>
<img src="/assets/images/astro/search/final2.jpg" width="70%"/>

## 新增 dompurify 套件

首先，我們需要引入 `DOMPurify` 套件，這個套件用於加強網站和應用程序的安全性，特別是在接受用戶提供的 HTML 內容時。它能夠檢測和清理潛在的跨站腳本攻擊（XSS）向量，同時確保 HTML 代碼符合標準和最佳實踐。

```bash
npm i dompurify
```

---

## 搜尋元件 SearchWidget

接下來，在`src/components/` 建立 `SearchWidget.astro` 搜尋元件

```astro
---

---

<form class="form" action="">
  <div class="flex h-12 items-center px-3 border border-gray-300 rounded-lg">
    <input
      class="w-full placeholder:text-primary-200 focus:outline-none focus:ring-transparent"
      placeholder="Search posts"
      name="search"
      id="search"
      min="2"
      max="24"
    />
    <button>
      <svg
        class="text-gray-600 h-4 w-4 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Capa_1"
        x="0px"
        y="0px"
        viewBox="0 0 56.966 56.966"
        style="enable-background:new 0 0 56.966 56.966;"
        xml:space="preserve"
        width="512px"
        height="512px"
      >
        <path
          d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
        ></path>
      </svg>
    </button>
  </div>
</form>


<script>
  import DOMPurify from 'dompurify';
  const form: HTMLFormElement = document.querySelector('form')!;

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const searchTerm = DOMPurify.sanitize(formData.get('search')?.toString());
    if (!searchTerm || searchTerm.length === 0) return;
    const url = new URL('/search', window.location.origin);

    url.searchParams.set('q', searchTerm);

    window.location.assign(url.toString());
  });
</script>

```

- html
  在這個元件中，我們建立了一個包含搜索輸入框和搜索按鈕的表單。

- js
  處理搜索請求，並將搜索結果顯示在搜尋結果頁面中。
  在這段程式碼裡添加了一個事件監聽器，以捕捉搜索表單的提交事件。

這個元件的關鍵功能是當用戶提交搜尋時，它將用戶輸入的搜尋詞進行淨化(`DOMPurify`)，然後將其附加到 URL 上，將用戶導向到搜尋結果頁面。這有助於實現即時搜尋功能。

---

## 建立可供搜尋的 json.ts

在 `src/pages` 建立一支 `search.json.ts`

```ts
import { getCollection } from "astro:content";
import { sortByDate } from "../lib/sortByDate";

async function getPosts() {
  const posts = await getCollection("blog");
  const sortedPosts = sortByDate(posts);

  return sortedPosts.map((post) => {
    return {
      slug: post.slug,
      title: post.data.title,
      date: post.data.pubDate,
    };
  });
}

export async function get({}) {
  return new Response(JSON.stringify(await getPosts()), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
```

這支檔案負責索引並提供可供搜尋的 `JSON` 資料，包括文章的`標題`、`日期`和 `slug`。現在我們已經有了搜尋數據，接下來建立搜尋結果頁面。

---

## 搜尋結果頁 search page

在 `src/pages` 建立 `search.astro` 搜尋結果頁面

```astro
---
import { SITE_TITLE } from '../consts';
import MainLayout from "../layouts/MainLayout.astro";
---
<MainLayout title={SITE_TITLE}>
  <main>
    <h2 id="searchTitle" class="text-3xl text-default text-center"></h2>
    <ul
      aria-label="Search Results"
      id="searchResults"
      class="py-10 border-y border-default"
    >
    </ul>
  </main>
</MainLayout>

<script>
  import DOMPurify from 'dompurify';
  import { SITE_TITLE } from '../consts';

  let SEARCH_DATA: any;

  const search: HTMLInputElement = document.querySelector('#search')!;
  const searchTitle: Element = document.querySelector('#searchTitle')!;
  const resultsList: Element = document.querySelector('#searchResults')!;

  // functions
  function updateDocumentTitle(search: string) {
    document.title = search ? `${SITE_TITLE} | Search “${search}”` : SITE_TITLE;
  }

  function updateSearchTitle(search: string) {
    const searchText = search ? `Search：${search}` : '';
    searchTitle.textContent = searchText;
  }

  const generateSearchList = (results: any, search: string) => {
    return results
      .map((r: any) => {
        const { title, date, slug } = r;
        const dateAsDate = new Date(date);
        return `<li class="py-4 px-[4vw]">
								<time datetime="${dateAsDate.toISOString()}">
									${dateAsDate.toLocaleDateString('en-us', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
								</time>
								<a href="/blog/${slug}/">${title}</a>
							</li>`;
      })
      .join('');
  };

  async function fetchSearchResults(search: string) {
    if (search?.length === 0) return;
    if (!SEARCH_DATA) {
      try {
        const res = await fetch('/search.json');

        if (!res.ok) {
          throw new Error('Something went wrong…please try again');
        }
        const data = await res.json();

        SEARCH_DATA = data;
      } catch (e) {
        console.error(e);
      }
    }

    const list = SEARCH_DATA.filter((s: any) => {
      return s.title.toLowerCase().includes(search.toLowerCase());
    });
    resultsList!.innerHTML =
      list?.length > 0
        ? generateSearchList(list, search)
        : `
      <div class="border-default py-10 px-[4vw]"><p>目前沒有關於 ${search} 主題的文章哦！</p></div>
      `;
  }

  // event listeners
  window.addEventListener('DOMContentLoaded', () => {
    const urlParams = DOMPurify.sanitize(
      new URLSearchParams(window.location.search).get('q')
    );

    fetchSearchResults(urlParams);
    updateDocumentTitle(urlParams);
    updateSearchTitle(urlParams);
    search.value = urlParams;
    search.focus();
  });
</script>
```

在這段程式碼中

- html 部份
  我們在 `<main>` 標籤中建立了一個用於顯示搜尋結果的容器。
  使用 id 屬性讓 js 能抓取得到
  `#searchTitle` 用來放置搜尋標題
  `#searchResults`，用來放置搜尋結果後的標題

- js
  - 宣告 `SEARCH_DATA` 變數，用於儲存搜尋結果
  - 定義 function 分別為
    - updateDocumentTitle(search): 更新網頁的標題。
    - updateSearchTitle(search): 更新搜尋結果頁標題。
    - generateSearchList(results, search): 將搜尋結果內容放到 HTML 列表上
    - fetchSearchResults(search): 從 JSON 資料中搜尋結果並顯示在網頁上。

---

## 引入 SearchWidget

最後將 `SearchWidget` 引入到 `src/components/Header.astro`，裡面的排板再稍微調整一下

```astro
---
import SearchWidget from './SearchWidget.astro';
---
<!-- 略 -->
<nav>
  <h2><a href="/">{SITE_TITLE}</a></h2>
  <div class="internal-links">
    <HeaderLink href="/">Home</HeaderLink>
    <HeaderLink href="/product">Product</HeaderLink>
    <HeaderLink href="/blog/page/1">Blog</HeaderLink>
    <HeaderLink href="/about">About</HeaderLink>
    <HeaderLink href="/contact">Contact</HeaderLink>
  </div>
  <!-- -->
  <div class="flex items-center gap-2">
    <SearchWidget />
    <Theme />
  </div>
  <!--  -->
</nav>
<!-- 略 -->
```

---

## 總結

今天，我們學到了：

- 如何引入 DOMPurify 套件，以增強網站安全性。
- 如何創建一個搜尋元件 SearchWidget，實現即時搜尋功能。
- 如何建立可供搜尋的 `JSON` 數據，以便搜尋結果的檢索。
- 如何創建搜尋結果頁面，並處理相關的 JavaScript 邏輯。
- 如何在文章中引入 SearchWidget 元件，以實現搜尋功能的互動。

範例連結：https://stackblitz.com/edit/withastro-astro-xosg7x
