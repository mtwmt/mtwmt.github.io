---
layout: angular
title: Angular 下拉選單如何選定預設值
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/21
---

## 情境

當表單送出後，資料庫會記錄送出後的值，下次再進來時，會需要重現上一次所填寫過的內容，這在實作上是很常遇到的事情。

## 解決方式

原以為這是件很簡單的事，讀取資料後，直接把值填上後即可(我想得太簡單了)，
當實作時，卻怎麼樣也選不了預設值，後來發現在需要在 select 裡 加上 `compareWith` 比對，下拉選單才會正確選到所設定的遇設值。

---

## 實作

這裡有套用到 [Angular Material](https://material.angular.io/)

以下是以複選值做範例

template

```html
<mat-form-field>
  <mat-label>Label</mat-label>
  <mat-select multiple [formControl]="selected" [compareWith]="compareFn">
    <mat-option *ngFor="let option of options" [value]="option">
      {{ option.label }}
    </mat-option>
  </mat-select>
</mat-form-field>
```

component

```ts
interface option {
  label: string;
  value: string;
}

export class ExampleComponent implements OnInit {
  selected = new FormControl();

  options: option[] = [
    {
      label: "apple",
      value: "apple",
    },
    {
      label: "kiwi",
      value: "kiwi",
    },
    {
      label: "banana",
      value: "banana",
    },
    {
      label: "cherry",
      value: "cherry",
    },
  ];

  ngOnInit(): void {
    // 若 api 來的值是 fruits = ['banana', 'banana']
    // 先將值轉為 option 格式

    // 模擬api來的值
    of(["banana", "kiwi"])
      .pipe(
        take(1),
        map((fruits: string[]) => {
          return fruits.map((e) => {
            return {
              label: e,
              value: e,
            };
          });
        })
      )
      .subscribe((options: option[]) => {
        this.selected.setValue(options);
      });
  }
  compareFn(a: option, b: option): boolean {
    return a && b ? a.value === b.value : a === b;
  }
}
```

若是需要單選的話，將 html 裡的 `multiple` 移除

這裡需要注意的是，FormControl 裡的值，需與 options 裡選單的格式是一樣，值才會被正常選中

---

## 程式碼解說

這裡需要有 rxjs 的概念
範例使用 of 模擬 observable api 讀取進來的資料
rxjs operators 的 `take` 執行一次後
再使用 map 轉成我們需要的格式
接著再 subscribe (訂閱) 出來 將值塞到 FormControl 裡

範例：[https://stackblitz.com/edit/angular-ivy-phixnz](https://stackblitz.com/edit/angular-ivy-phixnz)

---

參考資料：https://angular.tw/api/forms/SelectControlValueAccessor
