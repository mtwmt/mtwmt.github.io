---
title: JS hoisting (變數提升)
categories:
  - JavaScript
tags:
  - JavaScript
date: 2017/07/20
---

```javascript
foo();

function foo() {
  console.log(1);
}
var foo = function () {
  console.log(2);
};
function foo() {
  console.log(3);
}

foo();
```

所得到的結果依續會是
** 3 **  
** 2 **

根據 js 的特性
一般在全域範圍裡

不管 function 寫在哪裡 整段函式都會被自動提升到最上面
當然 var 也是 但是 var 只會提升變數名稱 而後面的值並不會
所以 當 var 裡面的變數還沒有值的時後 回傳的值就會是 undefined

以上面這段 code 來說 第一個 foo 會依據 js 逐行讀取的特性 所得到的結果就會是 3
而第二個 foo js 所讀取的順序就會是

```javascript
foo();
function foo() {
  console.log(1);
}
var foo;
function foo() {
  console.log(3);
}
var foo = function () {
  console.log(2);
};
foo();
```

答案就會是 ** 2 **
