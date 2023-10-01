---
title: Angular Reactive Form 響應式表單 (formControl)
categories:
  - Angular
tags:
  - Angular
  - Angular Form
  - ironman2021
date: 2021/09/14
---

昨天我們看了 一長串的表單使用範例
都是經過理解消化後所寫出來的 code ，那麼今天就來聊一聊消化的過程吧！

## 表單宣告

一開始 建立一個新的 form 表單，它會是一組的 group

```ts
export class FormComponent implements OnInit {
  form!: FormGroup;
}
```

> form 後面加上`!` 是 Typescript 2.0 的 `non-null`
> 可參考 [非空斷言運算子（ ! ）](https://angular.tw/guide/template-expression-operators) > [Non-null assertion operator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator)

一開始 form 裡 沒有給他任何的屬性與值，所以初始化時可使用 `FormBuilder` 來生成一個表單，在 formBuilder.group 裡會自動產生一個 FormControl 讓預設的值塞入，預設為空值

```ts
this.form = this.formBuilder.group({
  name: '',
  phone: '',
});
```

對應到 html 上的

```html
<form [formGroup]="form">
  <div>
    <label for="">name：</label>
    <input formControlName="name" type="text" />
  </div>
  <div>
    <label for="">phone：</label>
    <input formControlName="phone" type="tel" />
  </div>
</form>
```

> 注意：form 表單裡的 FormControl 必須與 template 裡的 formControlName 互相對應，不然會報錯

如圖： 這是 form 裡沒有命名為 phone 的 FormControl，所以出現了以下錯誤，這時後會覺得 Angular 非常的貼心 XD
![](/assets/images/ironman/ng_formControl/ViQgwS9.png)

---

## 另一種宣告方式

因為我已經知道我的 form 表單裡會需要有哪些內容
所以我在一開始的時後就直接將 form 裡所需操控的部份設定好

```ts
export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
  });
}
```

預設為空值，若需要帶預設值的時後會在 `ngOnInit` 裡讀到值後再將值變更塞入

```ts
ngOnInit(): void {
   this.form.setValue({
    name: 'Mandy',
    phone: '0912345678',
  });
}
```

## 取得表單裡的資料

.ts

```ts
this.form.value;
```

### 取得特定資料

.ts

```ts
// 取得 name 的值
this.form.get('name').value;
```

---

參考資料：

- [響應式表單](https://angular.tw/guide/reactive-forms)
- [FormControl Api](https://angular.tw/api/forms/FormControl)

---

明天就來說說 formArray 的部份
