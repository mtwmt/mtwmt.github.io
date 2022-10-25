---
layout: JavaScript
title: JS scope chain (範圍鏈)
categories:
  - JavaScript
tags:
  - JavaScript
date: 2017/07/18
---

```javascript
function b() {
  console.log(myVar);
}
function a() {
  var myVar = 2;
  b();
}
var myVar = 1;
a();
```

得到的結果會是
** 1 **  
為什麼呢?  
因為 function a、function b、var myVar = 1;
都是在同一個階層裡被宣告，以一般來說 如果外面沒有包任何東西 就是在全域裡被宣告  
所以 b 函式在執行的時後 會往外一層是尋找 myVar 的變數，就算 b 函式被丟到 a 函式裡執行也是一樣  
並不會因為 b 函式在 a 函式裡被執行 就會去讀 a 函式裡被設定的 myVar 變數

---

```javascript
function a() {
  function b() {
    console.log(myVar);
  }
  var myVar = 2;
  b();
}
var myVar = 1;
a();
b();
```

得到的結果會是
** 2 **  
** <span style="color:red;">ReferenceError: b is not defined</span>**  
因為 b 函式是在 a 函式裡被宣告，所以在 a 函式裡執行的 b 會往外一層(也就是 a 層)找 myVar 變數，  
當 a 函式被執行時 b 所得到的變數就會是 2  
但因 b 函式是在 a 函式裡被宣告 所以 b 函式的作用範圍也就只有在 a 函式裡  
自然他在其他地方被呼叫的時後 就會出現 error

---

```javascript
function a() {
  function b() {
    console.log(myVar);
  }
  b();
}
var myVar = 1;
a();
```

得到的結果會是
** 1 **
當 b 函式找不到他外部環境(也就是 a 層)所設定的變數時  
它就會再往外面一層去尋找，相同名字的變數

結論：函式(function)不會因為在哪裡被執行就會被隨意的改變外部環境(有點繞舌啊
