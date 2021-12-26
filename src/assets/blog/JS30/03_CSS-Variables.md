---
layout: JS30
title: JS30：03_CSS Variables
categories:
  - JS30
tags:
  - JavaScript
  - JavaScript 30 天
date: 2018/12/03
---

# CSS Variables (CSS 變數)

這次認識到 input 裡更多的 type 屬性 `range` 、 `color` 因為平常不太會用到 所以特別去查了一下
原來是 html5 裡新增的屬性 可參照 [HTML5 input type 屬性](http://www.w3school.com.cn/html5/att_input_type.asp)

## 摘要

- 了解 css 變數
- 利用 js 綁定監聽 input 變動的值 對應到頁面中的 img 元素 達到即時調整的效果

## css 變數宣告

```scss
//宣告變數
:root{
  --base: #70653e;
  --spacing: 10px;
  --blur: 10px;
}

//在使用時
img{
  padding: var(--spacing);
  background: var(--base);
  filter: blur(var(--blur));
}

```

CSS 變數宣告可參照 [引人注目的 CSS 變數（CSS Variable）](http://www.cnblogs.com/coco1s/p/6068522.html) 有更詳細的解說

這次是使用 `filter` CSS 濾鏡
更多 css 濾鏡介紹
[MDN-filter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
[CSS-Tricks_filter](https://css-tricks.com/almanac/properties/f/filter/)

## JS

利用 addEventListener 偵聽事件

> `dataset` 獲取 data 值 相當於 `getAttribute`

```javascript
const suffix = this.dataset.sizing || '';
//const suffix = this.getAttribute('data-sizing') || '';
```

[MDN-HTMLElement.dataset](https://developer.mozilla.org/zh-TW/docs/Web/API/HTMLElement/dataset)
[MDN-Element.getAttribute()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getAttribute)

> 使用`setProperty` 可以在 js 裡 把 css 屬性當做變數

```javascript
document.documentElement.style.setProperty('padding' , '10px');
// document.documentElement.style.padding = '10px';
```

[MDN-CSSStyleDeclaration.setProperty()](https://developer.mozilla.org/zh-CN/docs/Web/API/CSSStyleDeclaration/setProperty)

- js裡 寫css的style需要再手動加上單位，它並不會像jquery這麼人性化的自動幫你加上哦 (雷～


## 後記

可以在 css 裡使用變數算蠻新的使用方式
瀏覽器目前還沒那麼泛用，且通常都在 scss 裡就把變數處理掉了
所以目前處於知道就好的狀態

[YOUTUBE 影片教學連結](https://www.youtube.com/watch?v=AHLNzv13c2I)
