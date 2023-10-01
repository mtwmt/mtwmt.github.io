---
title: 實作 Astro 功能：文章標籤 (Tags)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/22
---

在前幾天，我們已經學會了如何建立文章列表，今天將介紹如何在 Astro 裡實現文章標籤與標籤列表頁面。文章標籤是不可或缺的，它有助於組織和分類文章，讓讀者更輕鬆地尋找相關內容！

## 確保文章標籤資訊

在開始之前，確保你的文章資訊中包含了`標籤（tags）`的資訊。這些標籤將用於分類文章。請檢查 `src/content/blog` 裡的 `markdown` 檔案，確保每篇文章中都有 tags 的資訊。

如下圖：
<img src="/assets/images/astro/tag/001.jpg" />

同時，打開 `src/content/config.ts` 並確保已配置了標籤相關的設定。
<img src="/assets/images/astro/tag/002.jpg" />

---

## 建立 tags 標籤組件

在 `src/components` 資料夾中建立一個名為 `Tags.astro` 的組件，這個組件將用於顯示文章的標籤。
我們一樣在 [tailwind components](https://tailwindcomponents.com/component/taglabel) 找一個喜歡的樣式套上

```astro
---
const { tags } = Astro.props;
---

{
  (tags || []).map((tag: any) => {
    return (
      <a href={`/blog/tags/${tag.toLowerCase()}`} class="mr-4 inline-block relative py-1 text-xs">
        <div class="absolute inset-0 text-neutral-200 flex">
          <svg viewBox="0 0 50 100">
            <path
              d="M49.9,0a17.1,17.1,0,0,0-12,5L5,37.9A17,17,0,0,0,5,62L37.9,94.9a17.1,17.1,0,0,0,12,5ZM25.4,59.4a9.5,9.5,0,1,1,9.5-9.5A9.5,9.5,0,0,1,25.4,59.4Z"
              fill="currentColor"
            />
          </svg>
          <div class="flex-grow h-full -ml-px bg-neutral-200 rounded-md rounded-l-none" />
        </div>
        <span class="relative text-neutral-500 uppercase font-semibold pr-px">
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>{tag}<span>&nbsp;</span>
        </span>
      </a>
    );
  })
}
```

- 使用 Astro.props 來接收從外部傳入的 tags 資料。
- 使用 .map() 方法遍歷每個標籤，並顯示它們的連結。
- 每個標籤連結包含標籤名稱，並根據標籤生成連結路徑。

---

## 引用 tags 標籤組件

接著在昨天寫好的 `src/page/[page].astro` 裡引用 `Tags.astro` 組件

```astro
---
// ...其他 import 省略
import Tags from '../../../components/Tags.astro';

// ...其他程式碼省略
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
               <Tags tags={post.data.tags} />  {/* 新增 Tags 組件 */}
            </p>
          ))
        }
      </ul>
    </section>
    <!-- ...略 -->
  </main>
</MainLayout>
```

- 從 `../../../components/Tags.astro` 引入 Tags 組件。
- 在文章列表中，使用 `<Tags tags={post.data.tags} />` 將文章的標籤傳遞給 `Tags` 組件，這樣每篇文章都會顯示相關的標籤。

---

## 建立 tag 標籤列表頁面

最後，再建立標籤列表頁面，以便讀者可以瀏覽特定標籤下的文章。
在 `src/pages/blog` 建立一個 `tags` 資料夾，再新增 `[tag].astro` 檔案

```astro
---
import { getCollection } from 'astro:content';
import { sortByDate } from '../../../lib/sortByDate';
import MainLayout from '../../../layouts/MainLayout.astro';
import FormattedDate from '../../../components/FormattedDate.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');

  // 取得所有不重複的標籤
  const tags = [
    ...new Set(posts.map((post: any) => post.data.tags).flat()),
  ].filter((d: any) => !!d);

  // 建立每個標籤的路徑
  const tagsList = tags.map((t: any) => {
    return {
      params: { tags: t.toLowerCase() },
      props: {
        tag: t,
        posts: sortByDate(
          posts.filter((p) => {
            return p.data.tags
              ?.map((tag: any) => tag.toLowerCase())
              .includes(t.toLowerCase());
          })
        ),
      },
    };
  });

  return tagsList
}

const { posts, tag } = Astro.props as any;
---

<MainLayout title={tag} >
  <main>
    <ul>
    {
      posts.map((post:any) => {
        return (
          <li>
            <a href={`/blog/${post.slug}`}>
                <FormattedDate
                  date={post.data.pubDate}
                />
                <span class="ml-4">{post.data.title}</span>
              </a>
          </li>
        )
      })
    }
    </ul>
  </main>
</MainLayout>
```

- 使用 getStaticPaths 函數來動態生成標籤列表頁面的路徑，並為每個標籤創建相應的路由。
- 在每個標籤列表頁面中，我們獲取相關標籤的文章列表，以便讀者可以瀏覽該標籤下的文章。

---

## 總結

今天，我們學到了：

- 學會如何在 Astro 項目中生成文章標籤列表，並將文章按標籤分類。
- 掌握了在 Astro 專案中建立自訂組件`（Tags）`的方法，以提供更豐富的內容呈現。
- 理解了如何使用 getStaticPaths 函數來生成動態路徑，以展示不同標籤的文章列表。
- 瞭解了如何使用 astro:content 模組來處理部落格文章的資料，並在頁面中呈現它們。


範例連結：https://stackblitz.com/edit/withastro-astro-ftzl1y