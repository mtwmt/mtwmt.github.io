---
title: 實作 Astro 頁面：建立 Blog 文章列表
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/20
---

今天，我們將學習如何使用 Astro 項目建立一個部落格文章列表頁面，並確保這些文章按照日期`由新到舊`的順序排列。

## 使用 Astro 與內容集合建立文章列表

在 `src/pages/blog/index.astro` 文件中，我們使用以下程式碼來查詢部落格內容並呈現文章列表

```astro
---
import { SITE_TITLE, SITE_DESCRIPTION } from '../../consts';
import MainLayout from '../../layouts/MainLayout.astro';
import FormattedDate from '../../components/FormattedDate.astro';
import { getCollection } from "astro:content";

const blogPosts = await getCollection("blog");

---
<MainLayout title={SITE_TITLE} description={SITE_DESCRIPTION}>
	<main>
	{
		blogPosts.map((post) => (
			<p>
				<FormattedDate date={post.data.pubDate} /><a class="pl-4" href={`/blog/${post.slug}/`}>{post.data.title}</a>
			</p>
		))
	}
	</main>
</MainLayout>
```

這段程式碼中，我們使用 `getCollection` 函數從 `astro:content` 模組中得到 `blog` 的內容集合。
接著，我們使用 `.map` 方法將每篇部落格文章的標題連結顯示在列表中。

## 了解文章內容集合

在 `blogPosts` 變數中，我們得到了一個陣列，裡面是所有 blog 文章內容。

內容會像是這樣

```js

[
  {
    id: 'first-post.md', //檔案名稱
    slug: 'first-post', //頁面路由
    body: '\n' +
      'Lorem ipsum .....' //文章內容
    collection: 'blog', // 在 content 的檔案資料夾
    data: { //文章頂部的相關訊息
      title: 'First post',
      description: 'Lorem ipsum dolor sit amet',
      pubDate: 2022-07-07T16:00:00.000Z,
      heroImage: '/blog-placeholder-3.jpg'
    },
  },
  {
    ....
  }
]
```

## 依日期排序文章

我們希望文章列表由新到舊的順序顯示，所以我們需要對 `blogPosts` 進行日期排序。
為了提高程式碼的可讀性和可維護性，我們將排序邏輯提取為一個單獨的函數。

在 `src/lib` 目錄中，建立一支名為 `sortByDate.ts` 的檔案，並在其中加入以下程式碼：

```ts
export const sortByDate = (array: any[]) => {
  const sortedArray = array.sort((a: any, b: any) => {
    const d1 = new Date(a.data.pubDate).valueOf();
    const d2 = new Date(b.data.pubDate).valueOf();

    return d2 - d1;
  });
  return sortedArray;
};
```

接著，在 index.astro 中導入 `sortByDate` 這個函數，並在 blogPosts 加入以下程式碼：

```ts
import { sortByDate } from "../../lib/sortByDate";
const blogPosts = sortByDate(await getCollection("blog"));
```

---

## 總結

今天，我們學到了：

- 理解如何使用 `getCollection` 從`astro:content`取得資料。
- 學會了如何整合 Markdown 的文件。
- 學會了如何使用自定義函數處理和排序列表。
- 掌握了如何動態生成網頁內容，以呈現部落格文章列表。

範例連結: https://stackblitz.com/edit/withastro-astro-jcvfl5
