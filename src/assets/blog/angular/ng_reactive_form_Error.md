---
layout: angular
title: Reactive Forms in Angular Disabled Warning ( 響應式表單 Disabled Warning )
categories:
  - Angular
tags:
  - Angular
  - error
date: 2020/09/26
---

## Disabled Warning

當我們在使用 Angular Reactive Forms 時 如

```html
<input [formControl]="formControl" [disable]="condition" />
```

用到 disable 時 console 會噴出以下警告訊息

```bash
It looks like you're using the disabled attribute with a reactive form directive. If you set disabled to true
when you set up this control in your component class, the disabled attribute will actually be set in the DOM for
you. We recommend using this approach to avoid 'changed after checked' errors.

Example:
form = new FormGroup({
  first: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
  last: new FormControl('Drew', Validators.required)
});
```

Angular 官方是建議在 ts 檔裡處理，但某些時後 在 html 裡處理會比在 ts 裡處理還要來的簡潔 便利 如：

```html
<input [formControl]="formControl" [disable]="isArr$ | async" />
```

有時後資料來源是 observe 在 template 裡可以直接使用 async 將資料 subscribe(訂閱) 出來

於是在網路上找到了兩個解法

## 解法一 屬性綁定

```html
<input [formControl]="formControl" [attr.disable]="isArr$ | async" />
```

資料來源：

https://stackoverflow.com/questions/46790342/why-does-disabled-candisable-will-not-work-for-angular2-reactive-forms

---

## 解法二 新增 Directive (適用 Angular 9 以上版本)

- Directive

```ts
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl], [disableControl]',
})
export class DisableControlDirective implements OnChanges {
  isDisabled: boolean;

  @Input() set disableControl(condition: boolean) {
    this.isDisabled = condition;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['disableControl']) {
      const action = this.isDisabled ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }

  constructor(private ngControl: NgControl) {}
}
```

- html 引用

```html
<input type="text" name="userName" formControlName="userName" appDisableControl [disableControl]="true" />
```

資料來源：

[Disabling Form Controls When Working With Reactive Forms in Angular](https://netbasal.com/disabling-form-controls-when-working-with-reactive-forms-in-angular-549dd7b42110)
[Directives not working with FormControl after upgrading to Angular 9](https://stackoverflow.com/questions/60075561/directives-not-working-with-formcontrol-after-upgrading-to-angular-9)
