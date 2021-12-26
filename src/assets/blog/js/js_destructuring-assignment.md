---
layout: js
title: JS 解構賦值
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
date: 2020/12/07
---

解構賦值，按照對應位置，進行賦值，如同鏡子般映射

## 陣列

### 基本用法

```javascript
let [a, b, c] = ['aa', 'bb', 'cc'];

// a = 'aa';
// b = 'bb';
// c = 'cc';
```

```javascript
let arr = [1, 2, 3];

let [a, b, c] = arr;

// a = 1;
// b = 2;
// c = 3;
```

### 略過某些值

```javascript
let [a, , b] = [1, 2, 3];

// a = 1;
// b = 3;
```

### 其餘運算

```javascript
const [a, ...b] = [1, 2, 3];

// a = 1;
// b = [2,3];
```

---

## 物件

```javascript
let obj = {
  a: '1',
  b: '2',
  c: '3',
};

let { a, b, c } = obj;

// a = 1;
// b = 2;
// c = 3;
```

### 其餘運算

```javascript
let { a, ...b } = [1, 2, 3];

// a = 1;
// b = {b: "2", c: "3"};
```

---

## 函式

```javascript
function add([x, y]) {
  return x + y;
}

add([1, 2]); // 3
```

```javascript
function example() {
  return [1, 2, 3];
}
let [a, b, c] = example();

// a = 1;
// b = 2;
// c = 3;
```

```javascript
function example() {
  return {
    foo: 1,
    bar: 2,
  };
}
let { foo, bar } = example();

// foo = 1;
// bar = 2;
```

---

## 用於遍歷(traversal) Map 結構

```javascript
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + ' is ' + value);
}
// first is hello
// second is world
```

若只是取得其中一個值，可以寫成這樣

```javascript
// 取得 key 值
for (let [key] of map) {
  // ...
}

// 取得 value 值
for (let [, value] of map) {
  // ...
}
```

---

## 引用外部檔案

```javascript
const { SourceMapConsumer, SourceNode } = require('source-map');
```

以上是將一些常用的方式記錄下

更詳細的使用方式可觀看 [变量的解构赋值](https://es6.ruanyifeng.com/#docs/destructuring)
