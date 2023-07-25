---
title: Angular 冒泡事件
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/20
---

今天就來個說個在新手時期很常遇到，但卻不知為什麼會發生的問題

來看一下我們前幾天的表單範例，與圖上 console 的部份

![](/assets/images/ironman/ng_bubbling-event/dlMy78O.gif)

在操控表單的時後，發現在點選新增欄位時，連`submit` 也一起被觸發了！
這是怎麼一回事呢！！！，明明就沒有按送出呀！
原來是 JavaScript 裡的冒泡事件。
這對經驗豐富的前輩們來說，想必很快就能聯想到這之間的問題，但對還是新手時期的小嫩嫩，卻常常百思不得其解

而且在表單裡很常遇到這問題，原因是因為通常表單的架構都會是這樣

---

## 表單架構

.html

```html
<!-- onSubmit -->
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div
    formArrayName="favorites"
    *ngFor="let fav of favorites.controls; let idx = index"
  >
    <div [formGroupName]="idx">
      <ng-container *ngIf="idx === 0">
        <label for="">favorites：</label>
        <!-- 新增 Button -->
        <button (click)="addField()">新增</button>
        <br />
      </ng-container>
      <input formControlName="favorite" type="text" [value]="" />
      <button (click)="removeField(idx)">移除</button>
    </div>
  </div>
  <p style="color:red" *ngIf="form.errors?.phone">YOUR PHONE ERROR</p>
  <button type="submit">Submit</button>
</form>
```

在 onSubmit() 事件的裡面，還有著其他事件，`新增`、`移除`，而當我點了新增按鈕後，同時也會觸發到 onSubmit() 這個事件

詳細機制可參考以下，這裡就不詳細說明了

[重新認識 JavaScript: Day 14 事件機制的原理](https://ithelp.ithome.com.tw/articles/10191970)
[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)

---

## 事件預設行為

Angular 裡的 `(click)` 會有一些預設行為，
目標事件決定了 `$event` 物件的形態。如果目標事件是來自原生 DOM 元素的，那麼 `$event` 是一個[DOM 事件物件](https://developer.mozilla.org/zh-TW/docs/Web/API/Event)，它具有 target 和 target.value 等屬性。

https://angular.tw/guide/event-binding-concepts#handling-events

---

### 該如何阻止它的行為產生呢？

在 html 裡直接阻擋

```html
<button (click)="$event.preventDefault();addField()">新增</button>
```

---

在 ts 裡阻擋

.html

```html
<button (click)="addField($event)">新增</button>
```

.ts

```ts
addField(e?: MouseEvent) {
  if (e) {
    e.preventDefault();
  }
}
```

以上兩個方式都可以。
把 click 的預設事件給阻檔掉就能避免其他事件被影響了！

今天的介紹就到此告一段落囉

參考資料：
[事件繫結的工作原理](https://angular.tw/guide/event-binding-concepts#handling-events)
[重新認識 JavaScript: Day 14 事件機制的原理](https://ithelp.ithome.com.tw/articles/10191970)
[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)
