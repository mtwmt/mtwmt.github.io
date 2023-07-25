---
title: Async/Await vs RxJS 非同步取值筆記
categories:
  - JavaScript
tags:
  - JavaScript
  - Rxjs
date: 2022/03/13
---

## Promise

在使用 `async/await` 一定要先了解 `Promise`

Promise 是 es6 之後才開始有的

Promise 程式碼

```js
const promise = new Promise((resolve, reject) => {
  resolve(value); // 完成
  reject('fail'); // 拒絕
});
```

將 promise 封裝後包成 function

```js
const fetchData = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((res) => {
        resolve(res.json());
      })
      .catch((e) => {
        reject(e);
      });
  });
};
```

---

## async/await

```js
// 排隊執行
const getData = async () => {
  try {
    const jewelery = await fetchData(
      'https://fakestoreapi.com/products/category/jewelery'
    );
    const electronics = await fetchData(
      'https://fakestoreapi.com/products/category/electronics'
    );
    return {
      electronics,
      jewelery,
    };
  } catch (e) {
    console.log('catch', e);
    throw new Error(e);
  }
};
```

使用 promise 可轉成 `then` 的串接

```js
getData().then((res) => {
  console.log('done', res);
});
```

[async/await 範例](https://stackblitz.com/edit/js-abcrfb)

---

## RxJS

```ts
import { ajax } from 'rxjs/ajax';
import { of, map, catchError, combineLatest } from 'rxjs';

const fetchJewelery$ = ajax(
  'https://fakestoreapi.com/products/category/jewelery'
).pipe(
  map((res) => {
    return res.response;
  }),
  catchError((error) => {
    console.log('error: ', error);
    return of(error);
  })
);

const fetchElectronics$ = ajax(
  'https://fakestoreapi.com/products/category/electronics'
).pipe(
  map((res) => {
    return res.response;
  }),
  catchError((error) => {
    console.log('error: ', error);
    return of(error);
  })
);

combineLatest([fetchJewelery$, fetchElectronics$]).subscribe(
  ([jewelery, electronics]) => {
    console.log('data', electronics, jewelery);
  }
);
```

[RxJS 範例](https://stackblitz.com/edit/rxjs-axmpfg)

---

參考連結：
[async await 你真的用對了嗎？](https://iter01.com/557755.html)
[Web 開發學習筆記 15 — 呼叫堆疊、同步與非同步、Promise、Async/Await、Conditional ternary operator](https://teagan-hsu.coderbridge.io/2021/01/03/javascript-async-promise/)
