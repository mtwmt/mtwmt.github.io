---
title: 實作 Astro 頁面：建立文章列表分頁 (Pagination)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/21
---

昨天，我們已經學習了如何建立文章列表頁面。
今天，我們將進一步學習如何在 Astro 專案中實現分頁功能，以便更好地管理和顯示內容，特別是當內容列表變得過長時。我們將使用 [Tailwind Components](https://tailwindcomponents.com/component/pagination-example) 這個分頁樣版來套用。

## 應用 Astro 路由和分頁

在前幾篇文章中，我們已經了解了如何設置 Astro 的路由。分頁功能實際上就是通過路由來實現的。首先，我們需要在 `src/blog/pages` 目錄中建立一個 `[page].astro` 文件，這個文件將處理分頁的顯示和內容。

程式碼如下：

```astro
---
import { getCollection } from 'astro:content';
import MainLayout from '../../../layouts/MainLayout.astro';
import { SITE_TITLE, SITE_DESCRIPTION } from '../../../consts';
import { sortByDate } from '../../../lib/sortByDate';
import FormattedDate from '../../../components/FormattedDate.astro';
import type { GetStaticPathsOptions, Page,  } from 'astro';


export async function getStaticPaths(options: GetStaticPathsOptions) {
  const { paginate } = options;
  const posts = sortByDate(await getCollection('blog'))
  return paginate(posts, { pageSize: 2 });
}

interface Props {
  page: Page;
}

const { page } = Astro.props;
const { data, url, start, end, total, size, currentPage, lastPage } = page;
const { prev, next, current } = url;
---

<MainLayout title={SITE_TITLE} description={SITE_DESCRIPTION}>
  <main>
    <section>
      <ul>
        {
          data.map((post) => (
            <p>
              <FormattedDate date={post.data.pubDate} />{' '}
              <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
            </p>
          ))
        }
      </ul>
    </section>

    <div class="flex flex-col items-center my-12">
      <div class="flex text-gray-700">
        {
          !!prev && (
            <a
              href={prev}
              class="h-12 w-12 mr-1 flex justify-center items-center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-left w-6 h-6"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </a>
          )
        }
        {
          [...Array(lastPage).keys()].map((e: number) => {
            return (
              <a href={`/blog/page/${e + 1}/`}
              class={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full ${
                currentPage === e + 1
                  ? 'bg-teal-600 text-white'
                  : 'text-default'
              }`}
              >
                {e + 1}
              </a>
            )
          })
        }
        {
          !!next && (
            <a
              href={next}
              class="h-12 w-12 ml-1 flex justify-center items-center rounded-full cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-right w-6 h-6"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          )
        }
      </div>
    </div>

  </main>
</MainLayout>
```

---

## 程式碼詳解

### 設定分頁路徑

```js
export async function getStaticPaths(options: GetStaticPathsOptions) {
  const { paginate } = options;
  const posts = sortByDate(await getCollection("blog"));
  return paginate(posts, { pageSize: 2 });
}
```

在這一部分，我們使用 `getStaticPaths` 函數來設定分頁路徑。我們首先取得部落格文章集合，然後使用 `paginate` 函數將文章按照`每頁 2 篇`的方式分割成多個分頁。這將生成不同的路徑，例如 `/blog/page/1/`、`/blog/page/2/` 等。

### 處理分頁資料

```js
const { page } = Astro.props;
const { data, url, start, end, total, size, currentPage, lastPage } = page;
const { prev, next, current } = url;
```

變數的設定如下：

- data: 包含當前頁面的文章資料的陣列，這些資料將顯示在分頁內容中。
- start 和 end: 分頁的起始和結束索引，這些索引表示當前頁面顯示的文章範圍。
- total: 總文章數，表示整個部落格中的文章總數。
- size: 每頁文章數，表示每個分頁中顯示的文章數量。
- currentPage: 當前頁碼，表示目前正在查看的分頁頁碼。
- lastPage: 最後一頁的頁碼，表示部落格內容分成的總分頁數。
- prev 和 next: 上一頁和下一頁的路徑，用於導航到前一頁和後一頁的分頁內容。

### 顯示分頁內容

```js
<MainLayout title={SITE_TITLE} description={SITE_DESCRIPTION}>
  <main>
    <section>
      <ul>
        {
          data.map((post) => (
            <p>
              <FormattedDate date={post.data.pubDate} />{' '}
              <a href={`/blog/${post.slug}/`}>{post.data.title}</a>
            </p>
          ))
        }
      </ul>
    </section>

    <div class="flex flex-col items-center my-12">
      <div class="flex text-gray-700">
        {
          !!prev && (
            <a
              href={prev}
              class="h-12 w-12 mr-1 flex justify-center items-center rounded-full"
            >
              <!-- 上一頁圖示 -->
            </a>
          )
        }
        {
          [...Array(lastPage).keys()].map((e: number) => {
            return (
              <a href={`/blog/page/${e + 1}/`}
              class={`w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full ${
                currentPage === e + 1
                  ? 'bg-teal-600 text-white'
                  : 'text-default'
              }`}
              >
                {e + 1}
              </a>
            )
          })
        }
        {
          !!next && (
            <a
              href={next}
              class="h-12 w-12 ml-1 flex justify-center items-center rounded-full cursor-pointer"
            >
              <!-- 下一頁圖示 -->
            </a>
          )
        }
      </div>
    </div>

  </main>
</MainLayout>
```

最後，我們在 `MainLayout` 中顯示分頁內容。遍歷 `data` 陣列，顯示每篇文章的標題和發布日期。在分頁控制部分，根據`上一頁`和`下一頁`的路徑來顯示相應的分頁連結。

---

## 總結

今天，我們學到了：

- 學習如何在 Astro 專案中實現分頁功能，以更好地管理和顯示內容。
- 使用 getStaticPaths 函數設定分頁路徑，以便動態生成分頁。
- 處理分頁資料，包括文章資料、分頁索引和路徑。
- 設計並顯示分頁控制連結，

範例連結：https://stackblitz.com/edit/withastro-astro-kclbjr

## 參考資料

https://docs.astro.build/en/reference/api-reference/#paginate
https://docs.astro.build/en/core-concepts/routing/#pagination
