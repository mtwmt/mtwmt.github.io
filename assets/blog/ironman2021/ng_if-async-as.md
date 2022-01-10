---
layout: angular
title: Angular ngIf 與 Async Pipe
categories:
  - Angular
tags:
  - Angular
  - RxJS
  - ironman2021
date: 2021/09/25
---

## 情境

當我們在 template 訂閱一組資料，而需要對它做一些邏輯處理的時後。

## 不好的方式

.ts

```ts
export class TemplateComponent {
  products$: Observable<any> = this.apiService.fetchProd();
  constructor(public apiService: ApiService) {}
}
```

.html

```html
<ng-container *ngIf="(products$ | async)?.length > 0; else empty">
  <ng-container *ngFor="let item of (products$ | async)"> ...略 </ng-container>
</ng-container>
<ng-template #empty> No Data </ng-template>
```

若像上述這樣的寫法，會造成重覆訂閱而增加 server 的負擔，所以在實作上，通常會避免這情況發生

---

## 解決方式

### 使用 ngIf as

將 html 寫法稍做修改

```html
<ng-container *ngIf="products$ | async as products;">
  <ng-container *ngIf="products.length > 0; else empty">
    <ng-container *ngFor="let item of products"> ...略 </ng-container>
  </ng-container>
</ng-container>
<ng-template #empty> No Data </ng-template>
```

將 `products$ | async` 定義為 `products`。
這樣就只會被訂閱一次，而這麼做的好處也可以使程式碼更容易閱讀，

---

## 加上 shareReplay

在 ts 檔裡加上 shareReplay
.ts

```ts
export class TemplateComponent {
  products$: Observable<any> = this.apiService.fetchProd().pipe(shareReplay());
  constructor(public apiService: ApiService) {}
}
```

---

還有一點要注意的是，在 ng-container 裡，不能同時使用 `ngIf` 與 `ngFor` 否則會報錯唷唷唷～

附錄：[RxJS Multicast 類 Operator (1) - multicast / publish / refCount / share / shareReplay](https://ithelp.ithome.com.tw/articles/10253517)

<!-- https://www.jianshu.com/p/0f5332f2bbf8 -->
