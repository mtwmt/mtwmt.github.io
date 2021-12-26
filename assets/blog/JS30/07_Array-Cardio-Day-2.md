---
layout: JavaScript
title: JS30：07_Array Cardio Day 2
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
date: 2019/01/18
---

# Array Cardio (陣列練習 2)

延續 04_Array Cardio Day 的後續，繼續悉其他操作陣列的方法

## 摘要

這次作者提供了 `people` 與 `comments` 兩組資料做練習

練習的題目依序是

- people 是否有人滿 19 歲 (some)
- people 是否全部人滿 19 歲 (every)
- 從 comments 找到 id 是 823423 的資料 (find ,findIndex)
- 從 comments 刪除 id 是 823423 這筆資料 (splice, slice)

## some

people 是否有人滿 19 歲

```javascript
const isAdult = people.some(function( person ){
      const currectYear = (new Date()).getFullYear();
      if( currectYear - person.year >=19 ){
        return true;
      }
    });
```

簡化成箭頭函式後的寫法

```javascript
const isAdult = people.some( person=> (new Date()).getFullYear() - person.year >= 19);
```

只要有一人符合 就會回傳 ture
[MDN-Array.prototype.some()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

## every

people 是否全部人滿 19 歲

```javascript
const allAdults = people.every( person=> (new Date()).getFullYear() - person.year >= 19);
```

需要全部符合 才會回傳 true，否則會是 false
[Array.prototype.every()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

## find(es6 新增的新函式)

```javascript
const comm = comments.find(function( comment ){
        if( comment.id === 823423 ){
          return true;
        }
      });

//簡化成箭頭函式後的寫法
const comm = comments.find( comment => comment.id === 823423 );
```

find 會回傳第一個等於 true 的值，也只會回傳第一個找到的物件
[Array.prototype.find()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

## fineIndex(es6 新增的新函式)

```javascript
const idx = comments.findIndex( comment => comment.id === 823423 );
```

與 find 不同的是 它回傳的是索引值，也一樣只會回傳第一筆
[Array.prototype.findIndex()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

## splice

```javascript
comments.splice( idx, 1 );
```

承上 刪除 `id 823423` 這一筆

comments.splice( 從哪一筆開始刪除, 刪幾筆, 這區間再插入新筆數 );

[Array.prototype.splice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

## slice (另一種刪除筆數的方式)

```javascript
const newComments = [
  ...comments.slice( 0, idx ),
  ...comments.slice( idx + 1 )
];
```

取出陣列裡某區域的值
comments.slice( 從哪一筆開始取, 從索引值 0 開始算來取到第幾個 (負數則表示從後面開始算) )

另外一提 `...` 是 ES6 的新增的 展開語法 方便陣列或物件的合併
在過去 陣列裡會使用 `push` 或是 `concat` 物件則是使用 `extend`
比起來 `...` 方便多啦

[Array.prototype.slice()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

[...展開語法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

## 後記

陣列處理有許多方式可以使用 只要能了解其中的優缺點 相信用起來便是如魚得水啊 (還在努力學習中 加油！)
題外話 英文不好的我還是常常把 splice 跟 slice 搞混 (囧~~~)


[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=QNmRfyNg1lw)