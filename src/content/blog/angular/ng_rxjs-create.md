---
title: Angular 如何將多筆資料上傳後，取得全部回傳資料，再送到另一支 API
categories:
  - Angular
tags:
  - Angular
  - RxJS
  - ironman2021
date: 2021/09/22
---

來回顧一下前幾天的日記文

[Angular 圖片上傳之...日記文](https://ithelp.ithome.com.tw/articles/10264083)
[程式碼流程規劃之...日記文](https://ithelp.ithome.com.tw/articles/10266565)

與今天介紹的內容有關，如何將多筆資料上傳後，取得全部回傳資料後
再將其資料整理，送到另一支 API
這次將會使用 RxJS 來做處理

## 情境

我有一筆訂單，裡面有許多的產品，需要先將產品上傳後，取得產品回傳後的 id，再將這些 id 塞到這筆訂單裡，此筆訂單才算完成。

## 狀況

因為是打 API，所以會有不同步的問題產生，首先必需要先克服這一點，才能繼續下一步

---

## 實作

> 假資料 API [FakeStoreAPI](https://fakestoreapi.com/docs)

在 service 裡先建立兩支 post api
一支是 `createProd` 用來建立產品資料
另一搬是 `createOrder` 用來建立訂單資料

service.ts

```js
createProd(data: any): Observable<any> {
  const url = `https://fakestoreapi.com/products`;
  const newData = JSON.stringify(data);
  return this.httpClient.post(url, newData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  });
}

createOrder(data: any): Observable<any> {
  const url = `https://fakestoreapi.com/carts`;
  const newData = JSON.stringify(data);
  return this.httpClient.post(url, newData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  });
}
```

在 template 裡做一個 submit 的按鈕

```html
<button (click)="onSubmit()">Create Product In Cart</button>
```

建立預設傳入資料
.ts

```js
products = [
  {
    title: 101,
    price: '11',
    quantity: 1,
  },
  {
    title: 102,
    price: '22',
    quantity: 35,
  },
  {
    title: 103,
    price: '33',
    quantity: 10,
  },
];

order = {
  userId: 5,
  date: new Date().toJSON(),
};
```

---

重頭戲來囉！！

.ts

```js
onSubmit(): void {
  const maydata = {
    products: this.products,
    order: this.order,
  };

  of(maydata)
    .pipe(
      concatMap((data) => {
        const update$ = data.products.map((product) => {
          return this.appService.createProd(product).pipe(
            map((res) => {
              return {
                productId: res._id,
                quantity: product.quantity,
              };
            })
          );
        });
        return combineLatest(update$ as Array<Observable<any>>).pipe(
          map((d) => {
            const combineData = { ...data.order, products: d };
            return combineData;
          })
        );
      }),
      switchMap((data) => {
        return this.appService.createOrder(data);
      })
    )
    .subscribe();
}
```

如圖所示：
![](/assets/images/ironman/ng_rxjs-create/JnNZsr8.gif)

---

## 案例解說 (RxJs 連續技使用)

這裡我先將所有要傳入的資料包成一個物件，然後使用 rxjs 裡的 `concatMap` (註一)去處理產品上傳這部份，
`concatMap` 的特性就是等所有資料都回傳回來後，才會進行下一步動作，接著再使用 `combineLatest`(註二) 的特性處理回傳回來後的資料，再使用 `switchMap`(註一)，打一下筆 API

說起來簡單 但實際上若是不熟 RxJs 會卡蠻久的 (沒錯，我就是苦主之一 XDDD)

---

## 附錄

範例：[https://stackblitz.com/edit/angular-ivy-qiwggq](https://stackblitz.com/edit/angular-ivy-qiwggq)

註一：[RxJS 轉換類型 Operators (2) - switchMap / concatMap / mergeMap / exhaustMap](https://ithelp.ithome.com.tw/articles/10248745)
註二：[RxJS 組合/建立類型 Operators (2) - combineLatest / forkJoin / race](https://ithelp.ithome.com.tw/articles/10247915)
