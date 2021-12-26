---
layout: css
title: 利用 js 搭配 css 繪製折線圖
categories:
  - css
tags:
  - chart
  - css
  - javascript
date: 2019/05/12
---

## 概念

> 利用 [畢氏定理](https://zh.wikipedia.org/wiki/%E5%8B%BE%E8%82%A1%E5%AE%9A%E7%90%86) 畫出兩點間的斜線

算斜率有兩種函數 分別為 `Math.atan()` 與 `Math.atan2()`

### Math.atan()

`Math.atan()` 接受一個參數，用法如下：

```js
//slope 值計算為 y/x (斜率比值無法判斷 y、x 方向，如 -1/-1、1/-1 等情況 )
angel = atan(slope);
```

angel 為一個角度的弧度值，`slope`是直線的斜率，是一個數字，這個數字可以是負的無窮大到正的無窮大之間的任何一個值(tan 的取值範圍)

```js
tanθ=tan(θ+180)
```

不過，利用它進行計算比較複雜。因為它的周期性，一個數字的反正切值不止一個。
例如 atan(-1)的值可能是 45 度，也可能是 225 度。
這樣就是它的周期性，對於正切函數來說，它的周期是 180 度，所以兩個相差 180 度的角具有相同的正切和斜率:
然而，Math.atan()只能返回一個角度值，因此確定它的角度非常的複雜，而且 90 度和 270 度的正切是無窮大，因為除數為零，我們也是比較難以處理的，因此我們更多的會採用第二個函數 Math.atan2()進行處理。

### Math.atan2()

```js
// x = x坐標。 y = y坐標。
angel = Math.atan2(y, x);
```

計算出來的結果 angel 是一個弧度值，也可以表示相對直角三角形對角的角，其中 x 是臨邊邊長，而 y 是對邊邊長。

由此 我們就可以寫出以下的函式

```js
// 算斜線弧度
gatTanDeg = function(y,x) {
  let result = Math.atan2(y,x) / (Math.PI / 180);
  result = parseFloat(result);
  return result;
},
```

### Math.hypot()

再來就是把線畫出來
利用 `Math.hypot` 算出兩點間的長度 `Math.hypot() 算出它的所有参数的平方和的平方根`

---

效果如下： 
<!-- {% iframe //codepen.io/mtw/embed/bybRNE/ 100% 300 %} -->
<!-- <iframe src="//codepen.io/mtw/embed/bybRNE/"></iframe> -->



總之就是一直算數學啦 ><
