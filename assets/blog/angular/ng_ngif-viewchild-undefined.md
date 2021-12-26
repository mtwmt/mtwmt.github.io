---
layout: angular
title: Angular viewchild undefined with ngIf
categories:
  - Angular
tags:
  - Angular
date: 2020/12/27
---

## 情境

當 angular 裡的 範本變數裡使用到 ngIf，在執行範本變數的時後會報錯，出現 undefined，無法操控

程式碼如下

html

```html
<app-child *ngIf="isShow" #child></app-child>
```

component

```ts
export class AppComponent {
  @ViewChild('child') childElement: any;

  isShow: boolean;

  updatChild(): void {
    this.isShow = !this.isShow;
  }
}
```

## 原因

使用 ngIf 時，一開始執行 `ngOnInit`，這個 dom 是不存在的，所以去操控這個 dom 的時後 就會報錯

## 解決方式

1. 使用 `ChangeDetectorRef` 再次偵測 dom
   因為 `ViewChild` 在只會執行一次，所以當 ngIf 條件變更為 true 的時後 不會重新抓取 dom， 這時後可以注入 `ChangeDetectorRef` 透過裡面的 `detectChanges` 方式，去偵測 dom 是不是有變更過，若是有變更的話 `ViewChild` 會再進行抓取

   [https://angular.tw/api/core/ChangeDetectorRef](https://angular.tw/api/core/ChangeDetectorRef)

2. 不使用 ngIf 改用 hidden
   在 Angular 裡 有提供 `[hidden]` 這個屬性，它在 html 裡是屬 `display: none` 所以 dom 是存在的 只是被隱藏，所以一開始 `ViewChild` 就能取得範本變數

---

範例：
[https://stackblitz.com/edit/angular-viewchild-undefined-ngif](https://stackblitz.com/edit/angular-viewchild-undefined-ngif)
