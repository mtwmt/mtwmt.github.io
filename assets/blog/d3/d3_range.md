---
layout: d3
title: D3 Range 解析
categories:
  - D3
tags:
  - D3
date: 2020/06/07
---

d3 range 屬於 d3-array 的一部份

[源始碼如下](https://github.com/d3/d3-array/blob/master/src/range.js)

```js
export default function (start, stop, step) {
  (start = +start),
    (stop = +stop),
    (step = (n = arguments.length) < 2 ? ((stop = start), (start = 0), 1) : n < 3 ? 1 : +step);

  var i = -1,
    n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
    range = new Array(n);

  while (++i < n) {
    range[i] = start + i * step;
  }
  return range;
}
```

---

## 解析

### 型別轉換

```js
(start = +start),
(stop = +stop),
```

拆解後如下

```js
start = Number(start);
stop = Number(stop);
```

因為要做計算所以
將傳進來的值強制轉為數字型別

可參考 [你懂 JavaScript 嗎？#8 強制轉型（Coercion）](https://ithelp.ithome.com.tw/articles/10201512)

### 三元運算子

```js
step = (n = arguments.length) < 2 ? ((stop = start), (start = 0), 1) : n < 3 ? 1 : +step;
```

拆解後如下

```js
if ((n = arguments.length) < 2) {
  // 如果傳進來的參數只有一個值
  stop = start;
  start = 0;
  step = 1;
} else {
  if (n < 3) {
    step = 1;
  } else {
    step = +step;
    // step = Number(step);
  }
}
```

- arguments

關於 arguments 可參考下列文章

[[筆記] 談談 JavaScript 中函式的參數(parameter),arguments 和展開運算子(spread)](https://pjchender.blogspot.com/2016/04/javascriptparameterargumentsspread.html)

- 三元(條件)運算子

`條件 ? 條件符合 (true) : 條件為否 (false)`

[MDN: 條件運算子](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)

### 迴圈

d3 這裡使用 while 迴圈

```js
var i = -1,
  n = Math.max(0, Math.ceil((stop - start) / step)) | 0, //算出要跑幾次迴圈
  range = new Array(n); // 再賦予 n 個空陣列

while (++i < n) {
  range[i] = start + i * step;
}
```

來說說 `++i` 與 `i++` 的差別

> ++i

迴圈執行前 先 +1
如同上面 一開始宣告 i = -1;
所以在執行迴圈時 i 會先+1 然後再去跑迴圈
所以這個 while 會從 0 開始跑

> i++ 後執行

迴圈執從後 才 +1
如用上述 這麼寫的話 會先從 -1 開始跑

> `for` 與 `while` 的差別

[重新認識 JavaScript: Day 09 流程判斷與迴圈](https://ithelp.ithome.com.tw/articles/10191453)
在這 kuro 大大的這篇文章最後面裡有提到 這兩者的差異性 這裡就不多說了 XD

---

## 使用函數

> 帶入起始值 與 結束點，從起始值開始，每個階段的累加值

```js
d3.range(3, 70, 8);
// [ 3, 11, 19, 27, 35, 43, 51, 59, 67 ]
```

> 如果沒有給它累加的值，則每次就只會累加 1

```js
d3.range(3, 10);
// [3, 4, 5, 6, 7, 8, 9]
```

> 如果只傳進來一個值

```js
d3.range(5);
// [0, 1, 2, 3, 4]
```

---

## TypeScript

改寫出了兩種寫法，出來的值都會是一樣的，但實際上的差別在哪 老實說 我也不是很清楚，這部份若是我有答案後，會再補充上來

```js
range(start: number, stop: number = start, step: number = 1) {
  if( arguments.length < 2 ){
    start = 0;
  }
  const n = Math.max(0, Math.ceil((stop - start) / step));
  const range = new Array(n);
  for (let i = 0; i < n; i++) {
    range[i] = (start + i * step)
  }
  return range;
}
```

```js
range(start: number, stop: number = start, step: number = 1, arr: Array<number> = [start]) {
  if (arguments.length < 2) {
    start = 0;
    arr = [0];
  }
  if (start + step >= stop) {
    return arr;
  } else {
    start = start + step;
    arr = [...arr, start]
    return this.range(start, stop, step, arr);
  }
}
```

因為工作需求，所以要用到 d3 這個 function 來轉換資料，但又不是使用在 d3 的繪製圖表裡，直接引用 d3 一大包也不太恰當，又因是使用 ts 撰寫，直接把 range.js 摳過來用 在 tslint 會報錯 所以就稍為改寫了一下 也做個記錄
