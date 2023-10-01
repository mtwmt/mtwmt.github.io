---
title: 了解 Markdown：網站開發和內容創作的強大工具
categories:
  - Markdown
tags:
  - Astro
  - Markdown
  - ironman2023
date: 2023/09/13
---

在網站開發和內容創作中，Markdown 是一種簡單而強大的標記語言，它能夠幫助你輕鬆地創建格式豐富的文本內容，例如文章、文檔和筆記。在本教學中，我們將深入了解 Markdown 的基本語法和用法，並學習如何在 Astro 項目的文章內容中應用 Markdown。

## 什麼是 Markdown？

Markdown 是一種純文本格式的標記語言，指在使寫作和閱讀變得簡單。它使用易於閱讀和寫作的普通文本，並且通過使用一些特殊符號和語法，可以簡單地轉換成格式化的內容。這讓你可以專注於內容，而無需擔心繁雜的排版。

## 基本語法

以下是一些常用的 Markdown 語法示例：

### 標題

使用 `#` 符號來表示標題，數量表示標題級別（從 1 到 6 級）。

```markdown
# 這是一個一級標題

## 這是一個二級標題

### 這是一個三級標題
```

### 列表

使用 `-` 或 `1.` 來創建無序或有序列表。

```markdown
- 項目 1
- 項目 2
- 項目 3

1. 第一項
2. 第二項
3. 第三項
```

使用 `*` 或 `_` 來強調文本，使用兩個 `*` 或 `_` 來使文本變粗。

```markdown
_斜體_ 或 _斜體_
**粗體**
```

### 鏈接和圖片

使用 `[文本](URL)` 來添加鏈接，使用 `![替代文字](圖片URL)` 來插入圖片。

```markdown
[Mandy's Blog](http://mtwmt.com)
![OpenAI 圖片](https://www.openai.com/images/logo.png)
```

### 區塊引用

使用 `>` 來表示區塊引用。

```markdown
> 這是一個區塊引用。
```

代碼塊
使用三個 ` 符號或四個空格來創建代碼塊。

````markdown
```javascript
function sayHello() {
  console.log("Hello, World!");
}
```
````

```

```

---

## 在 Astro 項目中使用 Markdown

在 Astro 項目中，你可以使用 `Markdown` 撰寫內容，並通過兩種不同方式將其應用到你的網站裡。

### 設定文章訊息 (YAML Front Matter)

在你的 Markdown 文件中，你可以設定各種文章的相關訊息，如標題、日期、描述、作者和封面圖片等。這些訊息通常以結構化的 YAML（YAML Ain't Markup Language）格式編寫。
這種格式易於閱讀和編寫。通常由三個破折號 `---` 包圍，這就是 `YAML Front Matter`。這個區塊可以用來設定文章的相關訊息，並在網站生成過程中被處理和應用。

然後，你可以開始撰寫文章內容。

```markdown
---
title: 標題
description: 文章描述
tags: 文章標籤,
pubDate: 時間
heroImage: 標題圖 (可有可無)
drafts: true or false (沒有的話 代表true)
---

文章內容
```

在 Astro 項目中，你可以將 `.md` 文件分別放在 `src/content` 和 `src/pages` 資料夾內。

如果你的 .md 文件位於 `src/pages` 資料夾內，你需要在 `YAML Front Matter` 中加入

```markdown
layout: ../layouts/MainLayout.astro
```

這將確保你的文章內容正確地應用在網站中。

在這種情況下，你的 `.md` 文件將成為一個 Astro 頁面。

---

## 總結

Markdown 是一種簡單且強大的標記語言，可以幫助你創建格式豐富的文本內容，並且容易在 Astro 項目中應用。希望這個教學幫助你了解 Markdown 的基本語法和在 Astro 項目中的應用方法。


## 參考資料

[Astro Markdown & MDX](https://docs.astro.build/zh-cn/guides/markdown-content/)