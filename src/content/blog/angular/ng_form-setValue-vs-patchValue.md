---
title: Angular Reactive Form 表單 setValue 與 patchValue 差異
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/16
---

今天就來說說 setValue 與 patchValue 差異這部份吧

一開始不太能理解這 setValue 與 patchValue 到底差在哪裡(官網的說明讓我不是很懂，理解力太差了 XD)，不是一樣都是賦值給 form 嗎

這幾天在使用的過程中，踩了一些雷後才懂，一個下午就這樣不見了，但！是值得的，只是我又要加班了 XDDDD

## 踩雷過程

這是表單裡的格式與所要塞入表單裡的資料

```ts
data = {
  name: 'Mandy',
  phone: '0912345678',
  favoritesOptions: [
    { id: 1, favorite: 'book' },
    { id: 2, favorite: 'sleep' },
    { id: 3, favorite: 'shopping' },
  ],
};

export class FormComponent implements OnInit {
  form: FormGroup = new FormGroup({
    name: new FormControl(),
    phone: new FormControl(),
    favorites: new FormArray([]),
  });
}
```

一開始要賦予初始值，我是這樣寫的
.ts

```ts
 ngOnInit(): void {
    this.form.setValue({
      name: this.data.name,
      phone: this.data.phone,
    });

    this.data.favoritesOptions.forEach((e) => {
      this.favorites.push(
        new FormGroup({
          id: new FormControl(e.id),
          favorite: new FormControl(e.favorite),
        })
      );
    });
 }
```

當時我以為對 form 表單已經很熟了，結果 想不到啊想不到，就噴了這個錯
![](/assets/images/ironman/ng_form-setValue-vs-patchValue/ZLJUlxk.png)

試著將 forEach 這串拿掉後，錯誤依然在
接著我將 code 改為

```ts
this.form.setValue({
  name: this.data.name,
  phone: this.data.phone,
  favorites: [],
});
```

錯誤才消失，但這不是我的要結果啊啊啊，陣列裡的值沒有出來。
後來我試著將 code 裡面的 setValue 改 patchValue

```ts
this.form.patchValue({
  name: this.data.name,
  phone: this.data.phone,
});
```

疑！錯誤消失了！！
接著再將之前拿掉的 forEach 補回去
哇！！！是我要的結果

接著再回官網裡看說明，[更新部分資料模型](https://angular.tw/guide/reactive-forms#updating-parts-of-the-data-model)

---

## setValue

官網說明：
使用 setValue() 方法來為單個控制元件設定新值。
setValue() `方法會嚴格遵循表單組的結構，並整體性替換控制元件的值。`

意思就是，表單裡的結構有哪些資料，必須 `1:1` 的放上去，缺一不可。

若想使用 `setValue` 單獨修改表單裡其中一個值的部份，可以這樣做

```ts
this.form.get('name')?.setValue(this.data.name);
```

---

## patchValue

官網說明：
使用 patchValue() 方法可以用物件中所定義的任何屬性為表單模型進行替換。

意思就是，我可以隨心所欲，想更新哪個值就更新哪個值
後來估狗翻譯了一下 patch 為修補的意思 (我為我的英文能力哀悼)
所以 patchValue 定義為我要修改裡面的值，不受表單的結構限制

---

到這裡才算完整了解這兩者的差異性 XD

參考資料：
[更新部分資料模型](https://angular.tw/guide/reactive-forms#updating-parts-of-the-data-model)
