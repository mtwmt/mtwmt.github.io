---
layout: Angular
title: Angular Reactive Forms 自訂表單驗証器
categories:
  - Angular
tags:
  - Angular
  - Angular Form
  - ironman2021
date: 2021/09/19
---

有表單 當然少不了驗証，這次的情境是

名字是必填欄位。
手機不一定會是必填，但填了後必須符合手機的格式，09 開頭 共 10 碼

來囉！！

---

## 加上表單驗証

在這個 form 表單的下方 新增一個驗証方式，動態驗証就寫在 validator 這裡面

```ts
export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup(
    {
      name: new FormControl("", Validators.required),
      phone: new FormControl(""),
      favorites: new FormArray([]),
    },
    { validators: validator }
  );
}
```

---

## 自訂驗証器

.ts

```ts
export const validator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const { name, phone, favorites } = control.value;
  // 手機號碼正規化
  const regPhone = RegExp(/^09[0-9]{8}$/);
  return !phone ? null : regPhone.test(phone) ? null : { phone: true };
};
```

若是號碼填寫錯誤，把 form 的 console 叫出來 會是像圖上這樣
![](assets/images/ironman/ng_formValidator/rAf9BXH.png)



一開始我們有設定名字為必填，圖上紅色框起來就是沒填到名字所出現的訊息
![](assets/images/ironman/ng_formValidator/fG6ckyD.png)

若無誤則會是 null，這樣我們就可以在 tmeplate 上做顯示讓使用使知道表單哪裡有問題

---

## 把錯誤訊息 show 出來！

在 html 裡加上錯誤訊息

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label for="">name：</label>
    <input formControlName="name" type="text" />
    <!-- 錯誤訊息判斷 -->
    <p style="color:red" *ngIf="form.get('name')?.errors?.required">
      Name Required
    </p>
  </div>
  <div>
    <label for="">phone：</label>
    <input formControlName="phone" type="tel" />
  </div>
  ...略
  <!-- 錯誤訊息判斷 -->
  <p style="color:red" *ngIf="form.errors?.phone">Your phone Error</p>
  <button type="submit">Submit</button>
</form>
```

---

下圖為判斷 form 裡的驗証訊息，來決定要不要讓表單送出
![](assets/images/ironman/ng_formValidator/HLirYwJ.png)

參考文件：

[把自訂驗證器新增到響應式表單中](https://angular.tw/guide/form-validation#adding-custom-validators-to-reactive-forms)
https://angular.tw/api/forms/ValidatorFn

---

小記：本來是有點懶的打這篇的，但前幾天，同事對我說，之後我們的表單都要有動態驗証哦！
我....嗯，...好 XDDD 然後就把久遠的回憶翻回來，再次熟悉了一下，這篇因此而生
