---
title: Angular ng-template 與 ngTemplateOutlet
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/27
---

## ngTemplateOutlet

ngTemplateOutlet 這裡我解釋為 ng-template 裡的插槽

來看看實際上會是如何使用
先來段程式碼，這裡為一筆物件資料

```ts
json = {
  key: `1`,
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
};
```

HTML

```html
<ng-container
  [ngTemplateOutlet]="jsonData"
  [ngTemplateOutletContext]="{ $implicit: json }"
></ng-container>

<ng-template #jsonData let-data> {{ data.name }} {{ data.age }} </ng-template>
```

ngTemplateOutlet 這個插槽的名字 我們取做 `jsonData`
在 ng-template 的插頭就要叫設定為 `#jsonData`

當它們這組名字對應到的時後 ng-template 裡的內容 就會在 ngTemplateOutlet 的地方呈現出來

`$implicit`： 為 ngTemplateOutlet 裡的預設值
在 ng-template 裡我們 設一個 叫 data 的變數 `let-data`
此時 `let-data` 就是對應到 上面 `ts` 傳進的 josn 資料物件

---

註：ngTemplateOutlet 的 另一種寫法

```html
<ng-container
  *ngTemplateOutlet="jsonData; context: { $implicit: json }"
></ng-container>
```

---

## 在 ngTemplateOutletContext 裡多做一些變數

來看看程式碼

```html
<ng-container
  [ngTemplateOutlet]="jsonData"
  [ngTemplateOutletContext]="{ $implicit: json, name: 'Mandy' }"
></ng-container>

<ng-template #jsonData let-data let-myname="name">
  {{ data.name }} {{ data.age }} {{ myname }}</ng-template
>
```

在 ngTemplateOutletContext 多設一個新的值 `name: Mandy`
ng-template 設一個新的變數叫 `myname` 裡的值會對應到 ngTemplateOutletContext 裡面的 name
以此類推

---

參考資料：https://stackoverflow.com/questions/45055384/what-is-implicit-in-angular-2
