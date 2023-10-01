---
title: 使用 Astro Data fetch 抓取 API 資料
categories:
  - Astro
tags:
  - Astro
  - Markdown
  - ironman2023
date: 2023/09/15
---

在昨天我們了解了如何在 Astro 中獲取內容集合中的文章資料，但現在可能會有更多問題：如果我們的資料來自 API 呢？這時，就可以使用 Astro 的數據提取功能。

## 使用 fetch()

在 Astro 中，所有組件都可以訪問全局的 `fetch()` 函數，以向 API 發送 HTTP 請求，可以使用完整的 URL（例如 https://example.com/api）或者使用 Astro.url + "/api" 來構建 URL。

這裡我們使用 DummyJSON 來模擬資料，並且示範如何獲取資料並在 Astro 組件中使用。



在 Astro 中，所有組件都可以在其組件腳本中訪問全局的 fetch() 函數，以使用完整的 URL（例如 https://example.com/api 或 Astro.url + "/api"）向 API 發送 HTTP 請求。

- 在 Astro 组件 script 中 使用 JS `async / await` 的優勢來得到資料
- 將得到的資料作為參數傳遞給 Astro 的組件

這裡使用 DummyJSON 來取得模擬的資料，來做範例。

```astro
---
// 定義一個函數將回應轉換為 JSON
const toJson = (res: Response) => {
  if (res.status === 404) {
    return undefined;
  }

  return res.json();
};

// 使用 fetch() 獲取資料
const fetchProducts = await fetch('https://dummyjson.com/product').then(toJson);

// 從獲得的資料中選擇前三個產品
const products = fetchProducts.products.slice(0, 3);

// 將資料輸出到控制台
console.log('data', products);
---

```
執行後，您可以在控制台中看到下輸出結果：

<img src="/assets/images/astro/fetch_data/001.jpg" />

---

## 使用 GraphQL 查詢

Astro 也支援使用 `fetch()` 來查詢 `GraphQL` 伺服器，只需傳遞有效的 `GraphQL` 查詢即可。

以下是一個使用 fetch() 和 GraphQL 查詢的範例：

```astro
---
const response = await fetch("https://swapi-graphql.netlify.app/.netlify/functions/index",
  {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      query: `
        query getFilm ($id:ID!) {
          film(id: $id) {
            title
            releaseDate
          }
        }
      `,
      variables: {
        id: "ZmlsbXM6MQ==",
      },
    }),
  });

// 解析 JSON 回應
const json = await response.json();

// 從回應中獲取電影信息
const { film } = json.data;
---
<h1>Fetching information about Star Wars: A New Hope</h1>
<h2>Title: {film.title}</h2>
<p>Year: {film.releaseDate}</p>
```

這個範例展示了如何使用 `fetch()` 和 `GraphQL` 查詢來從伺服器獲取電影信息。

---

## 總結：

Astro 提供了多種方式來從不同來源獲取數據，包括使用 fetch() 函數和 GraphQL 查詢。這使得在 Astro 應用中管理和呈現數據變得更加靈活和強大。無論您的資料來自內部 API 還是外部伺服器，Astro 都能滿足您的數據需求。

## 參考資料

[Astro Data Fetching](https://docs.astro.build/en/guides/data-fetching/)
