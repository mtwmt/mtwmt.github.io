---
layout: angular
title: Angular ng-container 與 ng-template
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/26
---

接續昨天的範例。
今天要聊的是 `ng-container` 與 `ng-template`

```html
<ng-container *ngIf="(products$ | async)?.length > 0; else empty">
  <ng-container *ngFor="let item of (products$ | async)"> ...略 </ng-container>
</ng-container>
<ng-template #empty> No Data </ng-template>
```

上面程式碼所要表達的是，若是資料大於 0 筆，頁面上就會呈現列表，沒有資料的時後在畫面上顯示 No Data

---

## ng-container

ng-container 在 Angular 的 template 裡，它不屬於任何一個 `tag`，也不會被渲染出來。
而它通常都會被拿來處理一些邏輯的事情，如 `*ngIf` 或 `*ngFor`。

雖然 `*ngIf`、`*ngFor` 這些也能寫在 `div` 上，不過 div 它會被呈現出來，有時後會影響排版，這時後 `ng-container` 就是我們的好朋友惹！

---

## ng-template 

因為在 `ng-container` 有使用到 `if/else`，所以這時後就需要一個 `ng-template` 來做搭配，通常它不會直接顯示出來，而是需要透過其他的指令，如`ngIf` 或是 `TemplateRef` 的搭配，當條件成立後，`ng-template` 裡的內容才會被呈現

---

## TemplateRef

.ts
```ts
export class TemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('tpl') tplRef!: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.viewContainerRef.createEmbeddedView(this.tplRef);
  }
}
```

.html
```html
<ng-template #tpl> Hello, Angular ! </ng-template>
```

---

## ng-template 處理多重結構指令

來看一下昨天的 `ngIf as` 的 範例

```html
<ng-container *ngIf="(products$ | async) as products;">
  <ng-container *ngIf="products.length > 0; else empty">
    <ng-container *ngFor="let item of products"> ...略 </ng-container>
  </ng-container>
</ng-container>
<ng-template #empty> No Data </ng-template>
```

光是 `ng-container` 就寫了三層，那有沒有辦法再更簡化一些呢!?
那我們可以使用 `ng-template` 這樣處理

```html
<ng-container *ngIf="(products$ | async) as products; else empty">
  <ng-template *ngIf="products.length > 0" ngFor let-item [ngForOf]="products">
    <div class="products">...略</div>
  </ng-template>
</ng-container>
```

---

## 後記

在 Angular 裡有一些 xxxOutlet 的指令
如　`ngTemplateOutlet`、`ngComponentOutlet`
接著 明天再來說說 ng-template 與 ngTemplateOutlet 這部份吧


## 參考資料

[NgForOf](https://angular.tw/api/common/NgForOf)
[ViewContainerRef](https://angular.tw/api/core/ViewContainerRef)
[Angular *ngIf variable with async pipe multiple conditions](https://stackoverflow.com/questions/49296784/angular-ngif-variable-with-async-pipe-multiple-conditions)
