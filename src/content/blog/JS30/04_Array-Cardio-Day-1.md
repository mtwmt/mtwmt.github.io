---
title: JS30：04_Array Cardio Day 1
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
date: 2019/01/16
---

# Array Cardio (陣列練習)

## 摘要

此次主要是練習陣列的一些用法
分別有八個例子
作者一開始在 html 上提供了三組資料給大家練習

`inventors`是一組是發明家的列表 裡面包含 姓、名、出生年份、死亡年份

練習的題目依序是

- 篩選出 `1500年 ~ 1600`前出生的人 (filter)
- 將`inventors`陣列裡的 `first` 跟 `last` 串起來 (map)
- 按出生日期排列，由小到大 (sort)
- 計算出所有發明家共活了多少年 (reduce)
- 按照發明家活了多少年來排序 (sort)
- 從作者提供的維基網址裡 篩選出 含有`de`的路名 ( map 與 filter 整合應用 )
- 對發明家的姓氏進行排列 (sort)
- 計算出`data`陣列裡每個種類的數量 (reduce)

> 這次也認識到了 `console.table` 的用法 幫你將陣列用表格排列 比`console.log`可視性高多了

## filter 陣列過濾操作

### 篩選出 1500 年 ~ 1600 前出生的人

```javascript
const fifteen = inventors.filter(function (inventor) {
  if (inventor.year >= 1500 && inventor.year < 1600) {
    return true;
  }
});

// 簡化成箭頭函式後的寫法
const fifteen = inventors.filter(
  (inventor) => inventor.year >= 1500 && inventor.year < 1600
);
```

[MDN-Array.prototype.filter()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## map

### 將 inventors 陣列裡的 first 跟 last 串起來

```javascript
const fullname = inventors.map(function (inventor) {
  return inventor.first + ' ' + inventor.last;
});
```

透過 map 的組合 組成一個新的陣列;
[MDN-Array.prototype.map()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## sort 排序

### 按出生日期排列，由小到大

```javascript
const ordered = inventors.sort(function (a, b) {
  if (a.year > b.year) {
    return 1;
  } else {
    return -1;
  }
});

// 簡化成三元運算
const ordered = inventors.sort((a, b) => (a.year > b.year ? 1 : -1));

// 另一種表示
const ordered = inventors.sort((a, b) => a.year - b.year);
```

### 按照發明家活了多少年來排序 (數字排序)

```javascript
const oldest = inventors.sort(function (a, b) {
  const lastGuy = a.passed - a.year;
  const nextGuy = b.passed - b.year;
  return lastGuy > nextGuy ? 1 : -1;
});
```

### 對發明家的姓氏進行排列 (字串排序)

```javascript
// 作者的寫法
const alpha = people.sort(function (lastOne, nextOne) {
  const [alast, afirst] = lastOne.split(', ');
  const [blast, bfirst] = nextOne.split(', ');
  return alast > blast ? -1 : 1;
});

// 我的寫法
const alpha = people.sort(function (a, b) {
  return a.split(', ')[0] > b.split(', ')[0] ? -1 : 1;
});
```

其實有點不太能理解作者為什麼會這樣寫 大概是為了再順便介紹 `split`的應用吧

[MDN-Array.prototype.sort()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## reduce 加總、分類

### 計算出所有發明家共活了多少年

```javascript
// 以前for迴圈的寫法
var totalYears = 0;
for (let i = 0; i < inventors.length; i++) {
  var liveYear = inventors[i].passed - inventors[i].year;
  totalYears += liveYear;
}

//reduce 寫法
const totalYears = inventors.reduce((total, inventor) => {
  return total + inventor.passed - inventor.year;
}, 0);
```

### 計算 data 陣列裡相同的種類數量

```javascript
// 以前筆者自己的寫法
var transportation = {};
data.map((e) => {
  transportation[e] = transportation[e] || 0;
  // transportation[e] = transportation[e] + 1;
  transportation[e]++;
});

// 作者的寫法
const transportation = data.reduce(function (obj, item) {
  if (!obj[item]) {
    obj[item] = 0;
  }
  obj[item]++;
  return obj;
}, {});
```

[Array.prototype.reduce()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

## map 與 filter 整合應用

### 從作者提供的維基網址裡 篩選出 含有 de 的路名

首先到作者提供的網址裡 開啟開發者工具做練習，
使用 `querySelectorAll` 去抓取節點， 所得到的會是一個`NodeList`

```javascript
cosnt category = document.querySelectorAll('.mw-category a');
```

所以需要利用 Array.from(obj)轉成陣列

```javascript
const links = Array.from(category);
```

ps.obj 就是由`querySelectorAll` 取得的 NodeList

接下來就是一連串的 map 與 filter 處理了

```javascript
const de = links
  .map((link) => link.textContent)
  .filter((streetName) => streetName.includes('de'));
```

值得一得的是 作者在這裡面使用了 `includes()` 做比對，這是 ES2016 裡新增的(不支援 ie)
取代了以前常使用的 `indexOf`

[MDN-Array.prototype.includes()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

## 後記

此次的學習 學到了許多其他之前不曾用過的處理陣列手法，處理方式更簡潔 讚!

[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=HB1ZC7czKRs)
