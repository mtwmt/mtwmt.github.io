---
layout: JavaScript
title: 拋棄 jQuery 用 JS 寫一個 gotop (回到最上) 功能吧!
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
  - components
date: 2021/05/10
---

## jQuery 寫法

```js
var $gotop = $('.gotop');
var $body = $('body, html');
$gotop.on('click', function () {
  $body.stop().animate({ scrollTop: 0 }, 500, 'swing');
});
```

jQuery 裡有提供一些動畫的函式庫 `animate` 讓使用者直接使用，所以短短幾行就能搞定
了

---

## JS

但為了一個 gotop 的功能 掛上一支 jQuery，實在有點不滑算，所以這裡使用了原生的 JS
來寫出相同效果的 gotop

在 JS 裡 有提供一個 window.scrollTo 的 event

[Window.scrollTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/scrollTo)

> 雖然文件上有寫支援 Safari 但我實測是不行的 MAC & IPHONE 都是

為了讓所有的瀏覽器都可以支援 scroll 所以寫了一個 scroll 的 event

```js
// 網頁載入完後執行
var ready = callback => {
  if (document.readyState != 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

ready(event => {
  // 捲軸滾動效果
  const scrollTo = (element, to, duration) => {
    if (duration <= 0) {
      return;
    }
    var difference = to - element.scrollTop;
    var perTick = (difference / duration) * 10;

    setTimeout(() => {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop === to) {
        return;
      }
      scrollTo(element, to, duration - 10);
    }, 10);
  };

  //
  var gotop = document.querySelector('.gotop');
  var body = document.querySelector('body, html');

  gotop.addEventListener('click', () => {
    scrollTo(body, 0, 500);
  });
});
```

實作如下：

<iframe src="//codepen.io/mtw/embed/BapXKmz/"></iframe>

---

## CSS

題外話，在 CSS 裡 現在也支援了 scroll 的效果，但目前支援的瀏覽器並不多，所以目前
應該還算是個中看不中用的屬性 XD

範例如下，在 CSS 裡加上 smooth，就會很平順的滑動了，就是這麼簡單 XD

```html
<main id="top">
  <section>1</section>
  <section>2</section>
</main>
<a href="#top" class="gotop">TOP</a>
```

```css
html,
body {
  scroll-behavior: smooth;
}
```

smooth 目前支援的瀏覽器可以參考這裡
[caniuse](https://caniuse.com/?search=scroll-behavior)

