---
title: 了解 Astro 語法元素 (Template)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/09
---

在這份教學中，我們將深入瞭解 Astro 語法的一些主要元素和相關範例，幫助您更好地理解如何使用 Astro 來建立網頁。

## 動態資料綁定

Astro 允許您在組件中綁定動態資料，這可以是來自組件屬性的資料，也可以是從資料源中獲取的資料。使用大括號 `{}` 來實現這一功能。以下是一個範例：

```astro
---
let name = "Alice";
---

<div>Hello, {name}!</div>
```

在這個範例中，我們宣告了一個名為 `name` 的變數，並在 `<div>` 元素中使用 `{name}` 來顯示動態資料。

### 條件渲染

您可以在 Astro 的 `script` 區塊中定義變數，根據條件來控制內容的顯示。以下是一個示例：

```astro
---
const show = true;
---

{show && <div>Show me!</div>}
```

在這個範例中，我們定義了一個名為 `show` 的變數，並使用 `{show && <div>Show me!</div>}` 來實現條件渲染。當 `show` 變數為 `true` 時，`<div>Show me!</div>` 將被渲染。

### 列表渲染：

Astro 提供了方便的方法來進行列表渲染。您可以使用 `map` 函數來迭代列表中的項目並渲染它們。以下是一個示例：

```astro
---
let items = ["Apple", "Banana", "Orange"];
---

<ul>
  {items.map((item) => <li>{item}</li>)}
</ul>

<!-- 等同於  -->

<ul>
  {
    items.map((item) => {
      return <li>{item}</li>;
    })
  }
</ul>
```

這個範例將渲染一個無序列表，其中包含列表 items 中的項目。使用 map 函數，我們可以動態生成列表項目。

---

## 組件、資源引入

在 Astro 中，您可以輕鬆引入組件和資源。以下是一個示例：

```astro
---
import Button from "../components/Button.astro";
---

<div>
  <Button title="Button 1" />
  <Button title="Button 2" />
  <Button title="Button 3" />
</div>
<img src="../../public/favicon.svg" alt="Logo" />
```

在這個範例中，我們從 `../components/Button.astro` 引入了一個名為 `Button` 的組件，並在頁面上多次使用它。同時，我們還引入了一個圖像資源。

---

## 總結

這些 Astro 語法元素可以幫助您建立具有動態資料綁定、條件渲染、列表渲染和資源引入功能的網頁。現在，您已經了解了 Astro 的一些基本語法，可以開始使用它來開發網頁囉。
