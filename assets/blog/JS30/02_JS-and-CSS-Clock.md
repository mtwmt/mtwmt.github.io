---
layout: JavaScript
title: JS30：02_JS and CSS Clock
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
date: 2018/12/02
---

# JS and CSS Clock (時鐘)

## 摘要

- 認識 css `transform`與 `transition` 調整時鐘指針
- 使用`new Date()`來讀取當前的時間
- 認識`setInterval()`計時

## CSS 處理

```js
border-radius: 40%;
transform-origin: 100%;
transform: rotate(90deg);
transition: all 0.05s;
transition-timing-function: cubic-bezier(0.1, 2.7, 0.58, 1)
```

- `transform` css 變形
  `transform-oragin` 設定變形軸心
  `transform:rotate(90deg)` 旋轉物件角度，正值為順時針，負值為逆時針

- `transition` css 過場處理 可參照[MDN-CSS transition](https://developer.mozilla.org/zh-TW/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions)

  `transition: all 0.05s;` 調整指針跳動效果

一開始在畫指針時是呈現水平狀態，為了讓指針停留在 00:00:00 所以必需旋轉 90 度。
另外 筆者稍微調整了一下時鐘上的指針 所以加上了 `border-radius: 40%;`

## JAVASCRIPT

`new Date()` 使用方式 [JavaScript Date 用法](http://www.w3school.com.cn/jsref/jsref_obj_date.asp)

`setInterval( 函式, 毫秒 )` 自動重覆執行，適合用來做計數器
另外還有 `setTimeout` 的用法

## 後記

Wes Bos 有提到 當 59 秒後 指針會回到 0 度 往前彈的小 bug
為了避免這個 bug
我在宣告時做了些處理

原本宣告

```javascript
const seconds = now.getSeconds();
```

改

```javascript
const seconds = (now.getSeconds() === 0 ) ? 60 : now.getSeconds();
```

當秒數為 0 秒時 則使用 60 秒取代 其他就是以當下秒數計算
避免有 0 度的產生

另外 網路上也看到有人做其他的處理方式
當 0 秒時，把過場的時間改為 0 也是可以的

[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=xu87YWbr4X0)
