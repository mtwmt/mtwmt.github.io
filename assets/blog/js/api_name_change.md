---
layout: JavaScript
title: 修改api(json)參數名稱(大小寫)
categories:
  - api
tags:
  - api
  - JavaScript
  - json
date: 2018/08/27
---

最近在跟後端合作時，常遇到 列表與明細頁的 api 相同，
但所提供的 api 卻是有分大小寫，在共用上常常因為大小寫不同，而導致 js 出錯
所以就只有在後端 api 吐過來的時後，先把 api 參數調整好，才能順利進行啊啊啊

```js
json = [{}, {}]; //API

var obj = [];

json.map(function (e, i) {
  obj[i] = {};
  for (var items in e) {
    obj[i][items.toUpperCase()] = e[items]; //參數改大寫
    // obj[i][items.toLowerCase()] = e[items];  //參數改小寫
  }
});
```

- [codepen 參考](https://codepen.io/mtw/pen/JZQvRE)
