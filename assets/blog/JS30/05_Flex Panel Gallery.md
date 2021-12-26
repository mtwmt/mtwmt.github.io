---
layout: JS30
title: JS30：05_Flex Panel Gallery
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
  - flex
date: 2019/01/29
---

# Flex Panel Gallery

這次要來做的 點擊圖片後 動畫展開的效果

## 摘要

- 了解 flex 裡的空間分配
- 了解 js 的 toggle 與 includes 事件

## CSS

#### 了解 flex 裡的空間分配 (對容器裡的物件做分配

`flex-grow` 剩餘空間分配比例
`flex-shirk` 壓縮比例
`flex-basis` 預約剩餘空間

三個值的縮寫為

```css
flex: flex-grow flex-shirk flex-basis
```

若是 flex 只有一個值的話 則是

```css
flex: flex-grow
```

可參考以下資料 這裡就不多做說明了 XD：
[深入理解 css3 中的 flex-grow、flex-shrink、flex-basis](http://zhoon.github.io/css3/2014/08/23/flex.html)

[深入解析 CSS Flexbox](https://www.oxxostudio.tw/articles/201501/css-flexbox.html)

[FLEX 速查小抄](https://darekkay.com/dev/flexbox-cheatsheet.html)

- FLEX IE9 以下不支援，若要支援 IE9 以下的瀏覽器 只好乖乖回去使用`float`排版囉

css 瀏覽器支援度 可查照 [Can I use](https://caniuse.com/)

---

### JS

```javascript
// 先將panels宣告
const panels = document.querySelectorAll('.panel');

// 寫一個open切換的function
function toggleOpen(e) {
  this.classList.toggle('open');
}

// 尋找panels下所有的div
panels.forEach(function(panel) {
  // 將toggleOpen的function提出來寫的一種方式，適合重復使用
  panel.addEventListener('click', toggleOpen);

  // 直譯式
  panel.addEventListener('transitionend', function(e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
      console.log(e.propertyName);
    }
  });
});
```

值得一提的是 `NodeList`有內建 forEach 功能
小嫩嫩如我 這在之前 以為 `NodeList`(註 1)是個陣列，想說試著使用 map 等其他事件跑跑看，都出現錯誤
若要使用 map 等其他事件時 需將 NodeList 轉為陣列 才能執行

原

```javascript
const panels = document.querySelectorAll('.panel');
panels.forEach(function(panel) {
  console.log(panel);
});
```

若要使用其他陣列事件的話 就該這麼做

```javascript
const panels = document.querySelectorAll('.panel');
const panelsToArray = Array.apply(null, panels);
panelsToArray.map(function(panel) {
  console.log(panel);
});

// panelsToArray.map(...);
// panelsToArray.slice(...);
```

註 1：[NodeList](https://developer.mozilla.org/zh-TW/docs/Web/API/NodeList)

[NodeList.prototype.forEach()](https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach)

[使用 Array 的三個技巧](http://www.jstips.co/zh_tw/javascript/3-array-hacks/)

[Element.classList](https://developer.mozilla.org/zh-TW/docs/Web/API/Element/classList)

[Array.prototype.includes()](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

[https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/contains)

## 後記

作者的範例 開打後 要再點一次才能縮回來
我試著改寫為 打開後 再點另一個圖 之前所打開的會自動縮回

程式碼如下

```javascript
const panels = document.querySelectorAll('.panel');

function toggleOpen(e) {
  panels.forEach(function(el) {
    if (el.classList.contains('open')) {
      el.classList.remove('open');
    }
  });
  this.classList.add('open');
}

panels.forEach(function(panel) {
  panel.addEventListener('click', toggleOpen);
  panel.addEventListener('transitionend', function(e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  });
});
```

此次課程雖多著重於 css 用法上，但 js 基礎不好的我 還是花了比較多時間在 js 的認識，也較了解 js 在 NodeList 上的執行方式

[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=9eif30i26jg)
