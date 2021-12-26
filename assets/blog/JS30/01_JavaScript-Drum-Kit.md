---
layout: JavaScript
title: JS30：01_JavaScript Drum Kit
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
date: 2018/12/01
---

# JavaScript Drum Kit (鍵盤打鼓)

## 摘要

- 了解鍵盤監聽事件 keyCode(鍵盤數字代碼)
- 鍵盤與聲音對應
- 畫面顯示所按到的鍵 (更改樣式)

## CSS 排版

此次排版主要是以 flex 為主
[FLEX 速查小抄](https://darekkay.com/dev/flexbox-cheatsheet.html)

## 查詢鍵盤數字代碼

```js
window.addEventListener('keydown',function(e){
  console.log(e.keyCode)
});
```

[key code 速查](http://keycode.info/)

---

## windows 監聽事件

```javascript
function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  //如果沒有audio這個元素 則返回
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  key.classList.add('playing');
}

window.addEventListener('keydown', playSound);
```

#### es6 語法

- `cosnt` 是 es6 裡新增的變數宣告 可參照 [MDN-const](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Statements/const)
- es6 語法糖

```javascript
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
`字符串 ${變數}`;

// es6過去寫法
var audio = document.querySelector('audio[data-key="' + e.keyCode + '"]');
```

#### 音效處理

當按下音效播放時 正在播放的音效 在還沒結束時 所按下的其他音效都會無效
因此需要設定重置撥放時間 `audio.currentTime = 0`

- `currentTime` 可參照[HTML 5 Audio/Video DOM currentTime](http://www.w3school.com.cn/tags/av_prop_currenttime.asp)

  [HTML 5 影片/音效參考手冊](http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp)

- 按下後 使對應的 div 加上`playing`樣式 產生 css 所寫好的特效
  `classList` [Element.classList](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList)

---

## 打完後 移除 css 所產生的樣式

```javascript
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));
```

#### es6 語法

- 箭頭函式

```javascript
keys.forEach((key) => key.addEventListener('transitionend', removeTransition));

// 拆解開後
keys.forEach((key, val) => {
  key.addEventListener('transitionend', removeTransition);
});

// es6前寫法
keys.forEach(function (key, val) {
  key.addEventListener('transitionend', removeTransition);
});
```

`forEach` 可參照 [MDN-Array.prototype.forEach()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

`transitionend` 效果結束後觸發 [MDN-transitionend](https://developer.mozilla.org/zh-CN/docs/Web/Events/transitionend)

[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=VuN8qwZoego)
