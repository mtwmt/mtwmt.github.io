---
layout: js
title: JS var 跟 let 差別 (變數宣告)
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
date: 2017/06/23
---

> 如何在 for 迴圈裡跑出利用 setTimeout 分別跑出 1~5

- var 全域變數 ( 在函式的區塊內 )，若找不到會向上查找，直到沒有相同的變數名稱
- let 區域變數 (es6 新增) 作用區在 `{}` 大括號裡
  沒有 hoisting 的問題

- const 是唯讀 ( 常數 ) 一旦定義後就無法改變
  宣告時一定要指定初始值 否則會產生 error
  沒有 hoisting 的問題

---

** 第一次測試 code **

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000);
}
```

一次跑出 5 個 5(不是我們要的

---

** 第二次測試 code **

```javascript
for (var i = 0; i < 5; i++) {
  function timer(t) {
    setTimeout(function () {
      console.log(t);
    }, 1000);
  }
  timer(i);
}
```

使用閉包特性讓他依續跑出 01234
但還是一次 show 出來
ps.閉包：在區域範圍裡才起的了做用

---

** 第三次測試 code **

```javascript
for (var i = 0; i < 5; i++) {
  function timer(t) {
    setTimeout(function () {
      console.log(t);
    }, 1000 * i);
  }
  timer(i);
}
```

補上時間差
ps.因為對 setTimeout 不熟 所以這部份小卡了一下 過程中方向完全錯誤
問了估狗大神後才知道要在秒數裡 \*i 做上時間差 讓迴圈裡面在跑的時後延遲秒數  
不然 for 跟火車一樣不等人

---

** 第四次測試 code **

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, 1000 * i);
}
```

把 var 換成 let
依續跑出 01234
傑克 這真的是太神奇啦，連閉包用的 function 都不用寫了

---

結論
var 跑出 for 迴圈的 {}後 東西還是在
let 跑出 for 迴圈的 {}後 就 error 了
