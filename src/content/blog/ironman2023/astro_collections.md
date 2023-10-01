---
title: 了解 Astro Content Collections（內容集合）
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/14
---

在 Astro 2.0.0 版本中，引入了 `Content Collections` 功能，這是一個極其強大的工具，用於管理和展示您的網站內容。本篇將帶您深入探討 Astro Content Collections，包括如何建立集合、定義集合結構、呈現內容，以及如何將它應用於您的網站。

## 什麼是 Content Collections？

Astro Content Collections 是在 Astro 項目中管理和組織內容的最佳方式。它幫助您整理文件，驗證前置資料（frontmatter），並為所有內容提供自動的 TypeScript 類型安全支持。

### 建立一個內容集合

首先，我們需要建立一個內容集合來存放文章。

內容集合是存放在 `src/content` 專案目錄中的頂級目錄，例如 `src/content/blog` 和 `src/content/authors`。值得注意的是，`src/content` 目錄僅用於存放內容集合，不應用於其他目的。

以 `src/content/blog` 為例，該目錄內可以包含如下內容：

```bash
src/
└── content/
│   │   ├── blog/
│   │   │   ├── first-post.md
│   │   │   ├── using-mdx.md
│   │   │   └── second-post.md
│   │   └── config.ts
```

### 定義集合架構

為了確保內容的一致性和資料完整性，我們可以定義集合的架構。這樣，`Astro` 將能夠自動生成 `TypeScript` 類型，以支持您在查詢集合時的自動完成和類型檢查。

以下是定義 blog 的集合架構範例：

`src/content/config.ts`

```ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  // 使用模式驗證前置資料 (frontmatter)
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    // 字串轉換為日期對象
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
```

圖為 `config.ts` 與 `.md` 對應檔

<img src="/assets/images/astro/collections/config.jpg" />

### 查詢和呈現集合內容

建立並定義了集合後，您可以使用內建的內容 API 來查詢和呈現集合內容。

接下來，在 `src/pages` 建立一個 `blog.astro` 的頁面

```astro
---
import { getCollection } from "astro:content";

const allPosts = await getCollection("blog"); // 取得所有的文章內容
---

<ul>
  {
    allPosts.map((post) => (
      <li>
        <a href={`/posts/${post.slug}`}>{post.data.title}</a>
        <time datetime={post.data.pubDate.toISOString()}>
          {post.data.pubDate.toDateString()}
        </time>
      </li>
    ))
  }
</ul>
```

### 動態路由和呈現單一集合內容

如果您希望為每個集合項目生成單獨的頁面，可以使用動態路由。以下是在 Astro 中實現動態路由的範例：

`src/pages/blog/[...slug].astro`

```astro
---
import { getEntry } from "astro:content";
import MarkdownPostLayout from "../../layouts/MarkdownPostLayout.astro";

// 取得動態路由的參數
const { slug } = Astro.params;

// 查詢對應的集合項目
const entry = await getEntry("posts", slug);

// 呈現內容並使用特定的版面配置
const { Content } = await entry.render();
---

<MarkdownPostLayout frontmatter={entry.data}>
  <Content />
</MarkdownPostLayout>
```

### TypeScript 設定

如果您的 `tsconfig.json` 文件尚未使用 Astro 的嚴格或最嚴格的 TypeScript 設置，可能需要更新該文件以啟用 `strictNullChecks`。

```json
{
  // 如果您使用 "astro/tsconfigs/strict" 或 "astro/tsconfigs/strictest"，則無需更改
  "extends": "astro/tsconfigs/base",
  "compilerOptions": {
    "strictNullChecks": true
  }
}
```

如果在 Astro 項目中使用 .js 或 .mjs 文件，您可以在 `tsconfig.json` 中啟用 `allowJs` 以啟用 IntelliSense 和類型檢查：

```json
{
  // 如果您使用 "astro/tsconfigs/strict" 或 "astro/tsconfigs/strictest"，則無需更改
  "extends": "astro/tsconfigs/base",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowJs": true
  }
}
```

---

## 總結

Astro Content Collections 功能為您提供了一個強大的工具，可更有效地組織和管理網站內容，同時提供了 TypeScript 型別安全和前置元驗證等功能。這不僅讓您更輕鬆地構建靜態網站和應用程序，還幫助保持項目的整潔和有序。

## 參考資料

[Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
