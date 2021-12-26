---
layout: js
title: JS Array 新增值的幾種方式
categories:
  - JavaScript
tags:
  - JavaScript
date: 2020/04/29
---

在工作上時 會常常處理到陣列傳遞的情況，偶然看到一些國外的文章寫整理的蠻好的，也就此剛好記錄下來

## 會改變原來陣列 ( 在記憶體裡是使用同一個位置 )

### push

直接將新的值加到後面

```js
const array = ['Apple', 'Banana'];

// push 一組新的值
array.push('Orange');
console.log(array); //["Apple", "Banana", "Orange"]

// push 多組
array.push('Orange', 'Mango');
console.log(array); //["Apple", "Banana", "Orange","Mango"]
```

es6 可以這樣寫

```js
const array = ['Apple', 'Banana'];
const fruit = ['Orange', 'Mango'];

array.push(...fruit);
console.log(array); //["Apple", "Banana", "Orange","Mango"]
```

### splice

splice 可以在很多情境上使用
可用來新增新的值，或是取代某個值等 這裡就介紹新增值的部份

> array.splice(start[, deleteCount[, item1[, item2[, ...]]]])

- start
  起始元素為 0，若大於陣列長度，則開始的索引值會被設為陣列長度，
  若為負數，則會從陣列的最後一個元素開始計算(起始值為 -1)，且若其絕對值大於陣列長度，則會變設為 0

- deleteCount
  表示要刪除原本陣列元素數量的整數

- item1, item2...
  從`start`開始，要加入到陣列的元素

```js
const array = ['Apple', 'Banana'];

array.splice(
  array.length, //在陣列的最後一筆開始新增新的元素
  0, //不刪除元素
  'Orange',
  'Mango' // 要新增的元素
);

console.log(array); //["Apple", "Banana", "Orange","Mango"]
```

### length

藉由陣列的長度去新增最後一筆元素

```js
const array = ['Apple', 'Banana'];
const length = array.length;

array[length] = 'Orange';

console.log(array); //["Apple", "Banana", "Orange"]
```

---

## 不改變原來陣列 產生一組新的陣列

### concat

用來合併陣列

```js
const array = ['Apple', 'Banana'];
const fruit = ['Orange', 'Mango'];

const newArray = array.concat(fruit);
console.log(newArray); //["Apple", "Banana", "Orange","Mango"]
```

也可以用來新增單個元素

```js
const array = ['Apple', 'Banana'];
const newArray = array.concat('tomato');

console.log(newArray); //["Apple", "Banana", "tomato"]
```

### ES6 陣列合併

目前最常用的方式

```js
const array = ['Apple', 'Banana'];
const fruit = ['Orange', 'Mango'];

const newArray = [...array, fruit];
console.log(newArray); //["Apple", "Banana", "Orange","Mango"]
```

---

參考資料：
[MDN: Array.prototype.splice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)
[5 Way to Append Item to Array in JavaScript](https://www.samanthaming.com/tidbits/87-5-ways-to-append-item-to-array/)
[How to append an item to an array in JavaScript](https://flaviocopes.com/how-to-append-item-to-array/)
