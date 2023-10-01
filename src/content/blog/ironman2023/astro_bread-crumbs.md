---
title: 實作 Astro 組件：麵包屑 (Bread Crumbs)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/25
---

今天，我們將實作如何使用 Astro 創建一個導覽麵包屑（Breadcrumbs）組件，以增加網站的導航和用戶體驗。導航面包屑通常用於指示用戶的當前位置，並使他們能夠輕鬆返回上一層或之前的頁面。

以下是完成後的畫面

<img src="/assets/images/astro/bread-crumbs/final.jpg" />

## 程式碼

首先，讓我們看一下創建面包屑導航所需的程式碼：

`sec/components/Breadcrumbs.astro`

```astro
---
const list = Astro.url.pathname.replace(/\/+$/, "").split("/").slice(1);
---

<nav>
  <ul class="flex items-center gap-1">
    <li class="after:content-['/'] after:mx-1">home</li>
    {
      list.map((breadcrumb, index) =>
        index + 1 === list.length ? (
          <li>
            <span class="line-clamp-1" aria-current="page">
              {breadcrumb}
            </span>
          </li>
        ) : (
        <li class="after:content-['/'] after:mx-1">
          <a href={`/${breadcrumb}/page/1/`}>
            {breadcrumb}
          </a>
        </li>
        )
      )
     }
  </ul>
</nav>

```

引用 `BreadCrumbs` 元件到 `src/layouts/BlogPost.astro` 頁面

```astro
---
import Breadcrumbs from '../components/Breadcrumbs.astro';
---

<MainLayout>
  <section>
    <!-- 其他頁面內容 -->
  </section>

  <Breadcrumbs />
</MainLayout>
```

---

## 程式碼詳解

- 我們首先從 Astro.url.pathname 中獲取當前 URL 的路徑。
- 使用正則表達式 replace 方法，我們去除了 URL 最後的斜線並將路徑分割為一個字串陣列。
- 建立了一個 <nav> 元素，並在其中包含了一個無序列表 (<ul>) 來顯示面包屑導航。
- 從 URL 的根路徑開始，將 `home` 作為首個面包屑元素。
- 使用 map 方法遍歷路徑的每個部分，創建對應的面包屑元素。
- 如果是最後一個路徑部分，我們將它作為純文本顯示。
- 如果不是最後一個路徑部分，我們將它作為連結，並生成下一個層級的 URL。
- 最後再將 `BreadCrumbs` 引用到頁面

## 總結

今天，我們學到了：

- 如何在 Astro 中使用組件功能來創建可重用的 UI 元素。
- 如何處理 URL 路徑以獲取所需的資訊。
- 如何使用 map 函數動態生成列表元素。
- 我們應用了這些知識來創建一個動態的面包屑導航，它可以根據當前頁面的 URL 自動生成。這是一個實用的 UI 元素，可用於改善網站的導航體驗

透過這篇文章的範例，我們學會了如何在 Astro 中創建面包屑導航，您可以根據自己的項目需求進一步擴充它。

範例連結：https://stackblitz.com/edit/withastro-astro-9kbech
