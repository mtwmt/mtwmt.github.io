---
title: 認識 Astro Pages (頁面)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/07
---

在 Astro 項目中，`Pages`扮演了重要角色。這些頁面位於 `src/pages/` 子目錄下，負責處理網站的路由、數據加載和整體頁面佈局。
今天，我們將探討 Astro 頁面的類型、路由策略和如何連接它們。

## 支援的頁面文件類型

Astro 支援多種頁面文件類型，包括：

- .astro
- .md
- .mdx（需要安裝 MDX Integration）
- .html
- .js/.ts（作為端點）

## 基於文件的路由

Astro 採用了一種稱為"基於文件的路由"的策略，這意味著 `src/pages/` 目錄中的每個文件都將成為您網站上的一個端點，其路由基於其文件路徑。更令人驚奇的是，單個文件還可以使用動態路由生成多個頁面，這樣您可以更靈活地組織內容。

## 頁面的連結

在 Astro 頁面中，您可以使用標準的 HTML `<a>` 元素來連接到網站中的其他頁面，這樣可以實現簡單而有效的導航。

## Astro 頁面

Astro 頁面通常以 .astro 文件副檔名結尾，並支持與 Astro 組件相同的功能。以下是一個簡單的範例：

```astro
---
---

<html lang="en">
  <head>
    <title>My Homepage</title>
  </head>
  <body>
    <h1>Welcome to my website!</h1>
  </body>
</html>
```

為了避免在每個頁面上重複相同的 HTML 元素，您可以將常見的 `<head>` 和 `<body>` 元素移動到自己的佈局組件中，並根據需要使用多個佈局組件

```astro
---
import MySiteLayout from "../layouts/MySiteLayout.astro";
---

<MySiteLayout>
  <p>My page content, wrapped in a layout!</p>
</MySiteLayout>
```

## Markdown/MDX 頁面

Astro 將位於 `src/pages/` 中的 `Markdown（.md）`文件視為網站中的頁面。如果安裝了 `MDX Integration`，同樣的規則也適用於 `MDX（.mdx）`文件。這些文件通常用於文本密集的頁面，如 blog 文章和文檔。

尤其是對於 `Markdown` 文件，頁面佈局非常有用。`Markdown` 文件可以使用特殊的佈局前置設置來指定一個佈局組件，這樣它的內容就會包裝在完整的 `<html>...</html>` 頁面文檔中。

```markdown
---
layout: "../layouts/MySiteLayout.astro"
title: "My Markdown page"
---

# Title

This is my page, written in **Markdown.**
```

## HTML 頁面

具有 `.html` 文件擴展名的文件可以直接放在 `src/pages/` 中，作為站點上的頁面。請注意，某些關鍵的 Astro 功能在 HTML 組件中不受支持。

## 自定義 404 錯誤頁面

如果需要自定義 404 錯誤頁面，可以在 `src/pages/` 中創建一個 `404.astro` 或 `404.md` 文件，這將生成一個 `404.html` 頁面，大多數部署服務將找到並使用它。

---

## 總結

在 Astro 中，`Pages`是處理網站的路由和頁面佈局的關鍵元素。您可以根據需求創建不同類型的頁面文件，使用簡單的 HTML 元素來實現頁面間的導航。

## 參考資料

[Astro Pages](https://docs.astro.build/en/core-concepts/astro-pages/)
