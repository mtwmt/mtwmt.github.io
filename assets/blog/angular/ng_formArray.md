---
layout: Angular
title: Angular Reactive Form 響應式表單 (formArray)
categories:
  - Angular
tags:
  - Angular
  - Angular Form
  - ironman2021
date: 2021/09/15
---

昨天介紹了 formControl 如何使用
今天來介紹 formArray
這部份老實說花了我不少時間才懂 XD

---

今天要在表單裡加上喜好，喜好會有很多，所以我們來使用 formArray 處理，預設值先給它一個空陣列

## 建立動態表單 (FormArray)

ts 程式裡的 favorites 是一組 formArray
我們先將這組 formArray 獨立出來操控它

```ts
export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    favorites: new FormArray([]),
  });

  get favorites() {
    return this.form.get("favorites") as FormArray;
  }
}
```

.html

```html
...略
<div
  formArrayName="favorites"
  *ngFor="let fav of favorites.controls; let idx = index"
>
  <div [formGroupName]="idx">
    <ng-container *ngIf="idx === 0">
      <label for="">favorites：</label>
      <br />
    </ng-container>
    <input formControlName="favorite" type="text" [value]="" />
    <button (click)="removeField(idx, $event)">移除</button>
  </div>
</div>
```

到目前為止，畫面上是沒東西的，原因是我們還沒為 FormArray 做表單控制元件

---

## 為 FormArray 新增一組 FormGroup

.html

```html
<div [formGroupName]="idx">
  <ng-container *ngIf="idx === 0">
    <label for="">favorites：</label>
    <!-- 加上新增按鈕 -->
    <button (click)="addField()">新增</button>
    <br />
  </ng-container>
  <input formControlName="favorite" type="text" />
  <button (click)="removeField(idx)">移除</button>
</div>
```

建立一個新增方法 `addField` 在 ngOnInit 時執行它，同時也在 html 裡加上新增按鈕

.ts

```ts
ngOnInit(): void {
  this.addField();
}

addField(): void {
  this.favorites.push(
    new FormGroup({
      id: new FormControl(),
      favorite: new FormControl(),
    })
  )
}
```

favorites 裡會是一個陣列，
所以當我們要新增一組陣列的時後就則是使用 push 的方式新增一組 FormGroup, 裡面再包 FormControl，如此一來 formArray 就新增一組新的資料了

---

## FormArray 一開始需要呈現多筆資料

在實作裡常常從 api 裡撈出一些資料 需要一開始的時後就呈現，所以在 ngOnInit 讀到資料的時後，就將資料餵給表單

.ts

```ts
// 預設資料表
favoritesOptions = [
  { id: 1, favorite: "book" },
  { id: 2, favorite: "sleep" },
  { id: 3, favorite: "shopping" },
];

ngOnInit(): void {
  this.favoritesOptions.forEach((e) => {
    this.favorites.push(
      new FormGroup({
        id: new FormControl(e.id),
        favorite: new FormControl(e.favorite),
      })
    );
  });
}
```

---

### FormArray 移除一筆資料

在 template 做一個移除按鈕

.html

```html
<ng-container
  formArrayName="favorites"
  *ngFor="let fav of favorites.controls; let idx = index"
>
  <div [formGroupName]="idx">
    <mat-form-field appearance="legacy">
      <mat-label>favorites</mat-label>
      <input formControlName="favorite" type="text" matInput />
      <!-- 新增移除按鈕 -->
      <mat-icon (click)="removeField(idx)" matSuffix>delete</mat-icon>
    </mat-form-field>
  </div>
</ng-container>
```

.ts

```ts
removeField(index: number): void {
  // 剩下一筆時不給刪！
  if (this.favorites.value.length > 1) {
    this.favorites.removeAt(index);
  }
}
```

這裡要注意的是，removeAt 裡面要帶的值 是 formArray value 裡的 `index` (索引)
如此一來，就能對表單做移除的動作了！

---

參考資料：

- [FormArray Api](https://angular.tw/api/forms/FormArray)

---

明天就來說說 setValue 與 patchValue 的差異，這裡也是踩了不少雷 XD
