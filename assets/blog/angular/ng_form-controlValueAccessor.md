---
layout: angular
title: Angular ControlValueAccessor (客製表單控制項)
categories:
  - Angular
tags:
  - Angular
  - Angular Form
date: 2022/03/13
---

當需要做 `component` 裡的表單特定值的連動，就會 `ControlValueAccessor` 就是不可或缺的要件

## ControlValueAccessor

建立新的 component 透過 implements `ControlValueAccessor` 達到表單值與不同 component 間的串連

可以看到官網裡 https://angular.tw/api/forms/ControlValueAccessor

使用 ControlValueAccessor 定義一個介面，這個介面充當 Angular 表單 API 和 DOM 中的原生元素之間的橋樑。

### 開始建立

在 `@Component` 註冊 `NG_VALUE_ACCESSOR`

```ts
{
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => CustomFormComponent),
},
```

interface 裡包含了四個必須加入的 function，以便與父層連動，分別為

- writeValue
  從這裡會接收到父層傳進來的值，或是外部的值有被更動過，都會從這裡接收到

```ts
writeValue(obj: any) {}
```

- registerOnChange
  註冊一個方法，當使用 `this.onChange( u r value )` 在這一層所更動的值，會同步更新至父層的 formValue

```ts
onChange = (value: any) => value;

registerOnChange(onChange: any) {
  this.onChange = onChange;
}
```

- registerOnTouched
  如同 registerOnChange，只要被 Touched(bulr) 過後 同時狀態也會被更新

```ts
onTouched = () => {};

registerOnTouched(onTouched: any) {
  this.onTouched = onTouched;
}
```

- setDisabledState
  更新 disable 的狀態。

```js
disabled = false;

setDisabledState(disabled: boolean) {
  this.disabled = disabled;
}
```

---

## 實現 ControlValueAccessor

ts

```ts
@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomFormComponent),
    },
  ],
})
export class CustomFormComponent implements ControlValueAccessor
{
  // 預設表單
  public form: FormGroup = new FormGroup({
    age: new FormControl(),
    desc: new FormControl(),
  });

  onChange: (value) => value;
  onTouched: () => {};

  // 用來接收 touched 的狀態
  touched = false;
  // 用來接收 disabled 的狀態
  disabled = false;

  writeValue(obj: any): void {
    // 父層做有被更新的話，會在這裡更新
    this.form.patchValue(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange() {
    // 當 formValue 被更新時，需觸發 onTouched 與 onChange
    this.onTouched();
    this.onChange(this.form.value)
  }
```

html

```html
<form [formGroup]="form">
  <div>
    <label for="">age:</label>
    <input formControlName="age" type="text" (change)="onInputChange()" />
  </div>
  <div>
    <label for="">desc:</label>
    <input formControlName="desc" type="tel" (change)="onInputChange()" />
  </div>
</form>
```

範例：https://stackblitz.com/edit/angular-ivy-huhcgi
