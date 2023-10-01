---
title: 實作 Astro 組件：文章目錄 (Toc)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/24
---

在前面的教學中，我們學習了如何建立文章列表和實現分頁功能。然而，內容頁面目前看起來有些單調，因此，今天我們將優化內容頁面，為文章新增一個文章目錄。

文章目錄是一個常見的功能，特別對於長篇內容非常有用。它允許讀者輕鬆尋找和導航到內容中的特定段落或章節。今天，我們將實作 Astro，為內容頁面新增一個文章目錄。

這是完成後的畫面

<img src="/assets/images/astro/toc/final.jpg" />

## 提取文章目錄要素 headings

`headings` 是指 HTML 文檔中的標題元素，通常是 `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>` 等。這些元素用於組織和分層次地呈現網頁內容。

所以我們在 `src/pages/blog/[...slug].astro` 這支檔案裡的 `post.render` 裡再加上 `headings`

<img src="/assets/images/astro/toc/001.jpg" width="" />

## 建立文章目錄組件

接著在 `src/components` 裡建立一個 `Toc.astro` 的組件

程式碼如下

```astro
---
interface Props {
  headings: Array<{
    depth: number;
    slug: string;
    text: string;
  }>;
}
const { headings } = Astro.props;
---
{
  !!headings.length && (
    <ul data-blog-toc class="sticky leading-5 top-0">
      <li class="h-10 border-b border-primary-700 bg-primary-900 px-3 text-primary-50">
        TOC
      </li>
      {headings.map(({ depth, slug, text }) => {
        let cls = '';
        switch (depth) {
          case 3:
            cls = 'text-base';
            break;
          case 4:
            cls = 'text-base';
            break;
          case 5:
            cls = 'text-sm';
            break;
          case 6:
            cls = 'text-sm';
            break;
          default:
            break;
        }
        return (
          <li class="border-primary-700 text-primary-50 hover:bg-primary-700 hover:text-white border-b">
            <a
              class={`block w-full cursor-pointer px-3 my-2 ${cls}`}
              href={`#${slug}`}
              aria-label={`Scroll to section: ${text}`}
            >
              {text}
            </a>
          </li>
        );
      })}
    </ul>
  )
}

<script>
  const setCurrent: IntersectionObserverCallback = (entries) => {
    for (let entry of entries) {
      const { id } = entry.target;
      const tocHeadingEl = document.querySelector(
        `[data-blog-toc] a[href="#${id}"]`
      );
      if (!tocHeadingEl) return;
      if (entry.isIntersecting) {
        document
          .querySelectorAll('[data-blog-toc] a')
          .forEach((e) => e.classList.remove('active'));
        tocHeadingEl.classList.add('active');
      }
    }
  };

  const observerOption: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px -180px',
    threshold: 1.0,
  };
  const headingObserver = new IntersectionObserver(setCurrent, observerOption);
  document
    .querySelectorAll('article :is(h2,h3,h4)')
    .forEach((heading) => headingObserver.observe(heading));
</script>
```

- 在這個組件會放到 `headings` 屬性，檢查是否存在標題目錄 `(headings.length > 0)`，如果有的話，則顯示文章目錄。
- 使用 `IntersectionObserver` 來實現目錄項目的互動效果。當讀者滾動頁面時，目錄項目將根據目前可見的內容部分變為活動狀態。

---

## 引用 toc 組件

接著更新 `src/layouts/BlogPost.astro` 這支檔案如下

```astro
---
// ...略

import Toc from '../components/Toc.astro';
type Props = CollectionEntry<'blog'>['data']

// 新增 headings
const { title, description, pubDate, updatedDate, heroImage, headings } = Astro.props;

---
<MainLayout>
<main>
  <article>
    <div class="hero-image">
      {heroImage && <img width={1020} height={510} src={heroImage} alt="" />}
    </div>
    <div class="prose lg:w-[960px]">
      <div class="title">
        <!-- 略 -->
      </div>
      <!-- update start -->
      <div class="lg:flex justify-between ">
        <div class={`${headings.length > 0 ? 'lg:w-[calc(100%-240px)]': ''}`}>
          <slot />
        </div>
        <!-- 引用toc -->
        {
          headings?.length > 0 && (
          <div class="hidden lg:block w-60 flex-grow ml-4">
            <Toc {headings}/>
          </div>
          )
        }
      </div>
      <!-- update end -->
    </div>
  </article>
  </main>
</MainLayout>
```

在這個 `layout` 中，檢查 `headings` 是否有內容，如果有，則在文章內容的一側顯示文章目錄。

---

## 頁面互動優化

為了讓捲軸滑動更平滑，在 `src/styles/global.css` 加上

```css
html,
body {
  scroll-behavior: smooth;
}
```

這將使頁面在滾動時具有更流暢的視覺效果。

---

## 總結

今天，我們學到了：

- 在文章內容頁面中新增標題層次標記。
- 建立了一個 Toc 組件，用於動態生成文章目錄。
- 在內容頁面的佈局中引用並顯示文章目錄。
- 優化了頁面的捲軸滾動效果，使閱讀更加流暢。


範例連結：https://stackblitz.com/edit/withastro-astro-oe6dcb
