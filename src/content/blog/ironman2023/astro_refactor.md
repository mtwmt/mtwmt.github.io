---
title: 重構 Astro Blog，實現統一的外觀佈局
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/19
---

在我們之前的教學中，我們學習如何整合 Tailwind CSS 並創建 Astro 項目的基本組件。
現在，我們將更進一步，通過建立一個統一的佈局（Layout），確保所有頁面在外觀上保持一致，提高整體專業度和使用者體驗。

## 建立 MainLayout

首先，在 `src/layouts` 文件夾中，我們將創建一個名為 `MainLayout.astro` 的新檔案。
這個佈局將包含網站的共同元素，例如 header、footer 以及其他可能的全局元素，都會放在這裡


- MainLayout.astro
```astro
---
import BaseHead from "../components/BaseHead.astro";
import Footer from "../components/Footer.astro";
import Header from "../components/Header.astro";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";
const { title = SITE_TITLE, description = SITE_DESCRIPTION } = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <BaseHead title={title} description={description} />
  </head>
  <body>
    <Header title={title} />
    <slot />
    <Footer />
  </body>
</html>
```

在 `MainLayout.astro` 中，我們引入了 `BaseHead`、`Footer` 和 `Header` 組件。使用 `slot` 標籤，我們允許每個頁面將自己的主要內容插入到這個統一佈局中。

## 應用統一的佈局(layout)到頁面

現在，我們將在 `src/pages/index.astro` 頁面中使用我們新建立的 `MainLayout`。

```astro
---
import MainLayout from "../layouts/MainLayout.astro";
---

<MainLayout>
  <main>
    <!-- page content -->
    <h1 class="text-cyan-500">🧑‍🚀 Hello, Astronaut!</h1>
    <!-- ...其他內容... -->
    ...
  </main>
</MainLayout>
```

同樣，我們也將 `MainLayout` 應用到 `BlogPost.astro` 頁面。

```astro
---
import type { CollectionEntry } from "astro:content";
import FormattedDate from "../components/FormattedDate.astro";
import MainLayout from "./MainLayout.astro";

type Props = CollectionEntry<"blog">["data"];

const { title, description, pubDate, updatedDate, heroImage } = Astro.props;
---

<MainLayout title={title} description={description}>
  <main>
    <article>
      <div class="hero-image">
        {heroImage && <img width={1020} height={510} src={heroImage} alt="" />}
      </div>
      <div class="prose">
        <div class="title">
          <div class="date">
            <FormattedDate date={pubDate} />
            {
              updatedDate && (
                <div class="last-updated-on">
                  Last updated on <FormattedDate date={updatedDate} />
                </div>
              )
            }
          </div>
          <h1>{title}</h1>
          <hr />
        </div>
        <slot />
      </div>
    </article>
  </main>
</MainLayout>

<!-- 將原本 style 移到最下面 -->
<style>
  /* 原本style */
</style>
```

以此類推，將所有的頁面的主要外框都套上 `MainLayout`

透過這種方式，確保所有的頁面都遵循相同的外觀和樣式，這將提升整體使用者體驗。

---

## 總結

今天，我們學到了：

- 如何創建一個統一的`佈局（Layout）`，以確保所有頁面具有一致的外觀和樣式。
- 如何在佈局中使用 `slot` 標籤，允許各個頁面插入其主要內容。
- 如何在不同頁面中應用我們創建的 `MainLayout` 佈局。

範例連結：https://stackblitz.com/edit/withastro-astro-ppeoqb