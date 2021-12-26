---
layout: ironman2021
title: Angular 淺拷貝之日記文
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/10/01
---

又踩雷啦啊哈哈哈哈哈。
來重現一下遇到的情境吧

---

## bug 出現

```ts

export class AppComponent implements OnInit {
  fruit : any = {
    apple: {},
    banana: {},
  };

  ngOnInit() {
    this.fruit = {
      apple: {
        id: 1,
        isSelect: false,
      },
      banana: {
        id: 2,
        isSelect: false,
      },
    };
  }

  onClick(isSelect: boolean) {
    this.fruit = {
      apple: {
        id: 1,
        isSelect,
      },
    };
  }

```

- 一開始建了一個 `fruit` 的物件，裡面有 `apple` 與 `banana` 這兩樣空物件
- 在 `OnInit` 時，賦予了 `apple` 與 `banana` 值
- 當我按下 button Click 的 時後， apple 裡的 isSelect 為 true

---

## 啊！踩到雷了！

如圖，按下去後，噴錯了！

![](assets/images/ironman/ng_shallowCopy-vs-deepCopy/n0KX6uJ.gif)

發現 banana 的 id 不見了，原來是我把 `this.fruit` 整個值給改掉了
本以為上述的寫法，只會修改我有填的值 XD

---

## 解法：解構賦值 => 淺拷貝(shallow copy)

這裡我使用了 js 裡的`解構賦值`處理，也可以用來做 `淺拷貝(shallow copy)`
將 onClick 的寫測改成這樣

```ts
onClick(isSelect: boolean) {
  this.fruit = {
    ...this.fruit,  // shallow copy
    apple: {
      id: 1,
      isSelect,
    },
  };
}
```

來看看成果。嗯...沒噴錯了 XD 結案！

![](assets/images/ironman/ng_shallowCopy-vs-deepCopy/tDm3C0c.gif)

---

## 筆記：深拷貝 (deep copy)

將原本的物件轉字串後再轉成物件，就會又是全新的一個物件了！

`JSON.parse(JSON.stringify(objArray));`

objArray 為要帶入的物件

---

## 後記：

本來以為是淺(深)拷貝的問題，後來仔細一看，原來是我自己搞錯了，將 `this.fruit` 裡面的整個值都蓋掉，所以才會噴錯，不過剛好也來認識一下 深拷貝與淺拷貝的這件事囉。

案例：[https://stackblitz.com/edit/angular-ivy-wvmptw](https://stackblitz.com/edit/angular-ivy-wvmptw)

參考資料：

[变量的解构赋值](https://es6.ruanyifeng.com/#docs/destructuring)
[深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://blog.techbridge.cc/2018/06/23/javascript-call-by-value-or-reference/)
[關於 JS 中的淺拷貝(shallow copy)以及深拷貝(deep copy)](https://medium.com/andy-blog/%E9%97%9C%E6%96%BCjs%E4%B8%AD%E7%9A%84%E6%B7%BA%E6%8B%B7%E8%B2%9D-shallow-copy-%E4%BB%A5%E5%8F%8A%E6%B7%B1%E6%8B%B7%E8%B2%9D-deep-copy-5f5bbe96c122)
