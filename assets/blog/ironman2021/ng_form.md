---
layout: Angular
title: Angular Reactive Form 表單
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/13
---

## 表單

表單在實作上是件常見的的處理，為什麼會寫這篇呢？實在是因為我太容易忘了 XD
還記得一開始接觸到表單操控時， Angular reactive form 的官方文件它雖然寫的很清楚，但對於當時剛趟入 Angular 領域的我 還是看的一頭霧水，尤其是在 formArray 的應用上，那麼，就趁著這次機會記錄下來吧！

---

## 實作

app.module.ts

```ts
@NgModule({
  declarations: [
    ...
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

務必在 app.module.ts 裡加上 FormsModule 與 ReactiveFormsModule，否則會報錯。

---

.ts
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

  // 新增
  addField(e?: MouseEvent, value?: any) {
    if (e) {
      e.preventDefault();
    }

    const id =
      this.favorites.controls.length > 0
        ? this.favorites.value[this.favorites.value.length - 1].id + 1
        : 0;

    this.favorites.push(
      new FormGroup({
        id: new FormControl(id),
        favorite: new FormControl(),
      })
    );
  }

  // 移除
  removeField(index: number, e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    if (this.favorites.value.length > 1) {
      this.favorites.removeAt(index);
    }
  }

  onSubmit(): void {
    console.log("onSubmit", this.form.value);
  }
}
```

.html
```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <div>
    <label for="">name：</label>
    <input formControlName="name" type="text" />
  </div>
  <div>
    <label for="">phone：</label>
    <input formControlName="phone" type="tel" />
  </div>
  <div
    formArrayName="favorites"
    *ngFor="let fav of favorites.controls; let idx = index"
  >
    <div [formGroupName]="idx">
      <ng-container *ngIf="idx === 0">
        <label for="">favorites：</label>
        <button (click)="addField($event)">新增</button>
        <br />
      </ng-container>
      <input formControlName="favorite" type="text" [value]="" />
      <button (click)="removeField(idx, $event)">移除</button>
    </div>
  </div>
  <button type="submit">Submit</button>
</form>
```

---

## 關於 reactive form 裡的一些架構

官方文件的解釋：
`FormGroup` 用於追蹤一個表單控制元件組的值和狀態。
`FormControl` 實例用於追蹤單個表單控制元件的值和驗證狀態。
`FormArray` 用於追蹤表單控制元件陣列的值和狀態。


我的理解：
`FormGroup` 將需要被賦值與操控的表單群組起來 = 物件
`FormControl` 主要是查看 value 與 驗證的狀態 = 物件裡的值
`FormArray` 表單裡的陣列
使用陣列時，需要再包一層 FormGroup 才能使用 FormControl 新增

若需要賦予一組值時，需要先新增 FormControl 去做對應，否則會報錯

---

文件：https://angular.tw/guide/forms-overview#setting-up-the-form-model
API：https://angular.tw/api/forms

---

今天先來個實際範例，明天來說說 formControl 這部份
