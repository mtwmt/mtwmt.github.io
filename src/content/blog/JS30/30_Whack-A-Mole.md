---
title: JS30：30_Whack A Mole!
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
date: 2018/11/26
---

# Whack A Mole! (打地鼠)

## 摘要

- 先規劃地鼠出現時間 ( 亂數時間出現 )
- 設定地鼠出現位置
- 將出現時間跟地鼠出現位置整合
- 點按鈕控制遊戲開始
- 打地鼠計分!!

## 初始變數設定

```javascript
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
```

## 地鼠出現時間

```javascript
// 取最小值&最大值 區間的亂數值
// Math.round 四捨五入到最近整數的值。
function randTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

- 上述算法的產生可參考 [[筆記][JavaScript]用 Math.random()取得亂數的技巧](https://ithelp.ithome.com.tw/articles/10197920)

## 地鼠出現位置(隨機)

```javascript
let lastHole;
```

新增變數 `lastHole` 做撮記

```javascript
// Math.floor 取最大整數(無條件進位)
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  // 假如 重覆出現同個tag 就回傳 重新再跑一次
  if (hole === lastHole) {
    console.log('same');
    return randomHole(holes);
  }
  // 最後一次出現位置 做撮記記下來
  lastHole = hole;
  return hole;
}
```

## 地鼠出來玩

```javascript
let timeUP = false;
```

新增`timeUP` 時間到變數

```javascript
function peep() {
  const time = randTime(200, 1000);
  const hole = randomHole(holes);
  hole.classList.add('up');
  // 設定地鼠縮頭時間，與結束
  setTimeout(function () {
    hole.classList.remove('up');
    if (!timeUP) peep();
  }, time);
}
```

整合剛剛的時間與出現位置，地鼠會隨機探出頭
`timeUP = true` 表示時間到 遊戲結束

## 設定遊戲開始按鈕( 把值都調回初使值 )

```javascript
function startGame() {
  scoreBoard.textContent = 0;
  timeUP = false;
  score = 0;
  peep();

  // 設定結束時間
  setTimeout(function () {
    timeUP = true;
    console.log('timeup');
  }, 10000);
}
```

## 打地鼠囉，時間內打到就 +1 分

```javascript
function bonk(e) {
  if (!e.isTrusted) return; //騙子!
  //計算分數
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;
}

moles.forEach(function (e, i) {
  e.addEventListener('click', bonk);
});
```

`e.isTrusted` 可透過此屬性來判斷事件是否由使用者操控來產生
可參照 [MDN-Event.isTrusted](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/isTrusted)

[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=toNFfAaWghU)
