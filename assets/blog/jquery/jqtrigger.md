---
layout: jquery
title: jQuery-trigger
categories:
  - jquery
tags:
  - jquery
  - JavaScript
date: 2017/07/06
---

trigger 這個屬性是 jQuery 所建構出來的

官方文件介紹
[http://api.jquery.com/trigger/](http://api.jquery.com/trigger/)

沒錯 都是英文，他寫的很清楚，但我看的很模糊  
算了下我花了快半年以上的時間 才真正搞懂如何去應用它(應該是吧?!

```javascript
$('#foo').on('custom', function (event, param1, param2) {
  alert(param1 + '\n' + param2);
});
$('#foo').trigger('custom', ['Custom', 'Event']);
```

主要是這一串，對於新手的我 看不太懂他上面的意思
連理解順續也反了

不過沒關係 能用就好了

他上面的意思是

首先 我先 trigger 一個叫 **custom** 的字串 沒錯 他只能使用字串帶入
這個字串 可以由我自己去定義事件名稱，或是使用目前 jQuery 裡現有的事件名字
而字串後面的 **[ "Custom", "Event" ]** 則是帶入的參數，他可以是陣列 或是物件(?!

接著 我要用 on 去觸發 **custom** 這個由我自定義的事件
後面再帶入我要執行的 function 函式，第一個 event 是 **custom** 裡的內建參數
接著 **param1、param2** 才是我剛剛分別帶入的**[ "Custom", "Event" ]**參數
然後再開始在大括號後裡寫我要做的事

### ps.要先 on 才能 trigger

---

補上對應的 javascript 寫法供參考

jQuery

```javascript
$(el).trigger('custom');
```

javascript

```javascript
var event = document.createEvent('HTMLEvents');
event.initEvent('custom', true, false);
el.dispatchEvent(event);
```

---

jQuery

```javascript
$(el).trigger('custom', { some: 'data' });
```

javascript

```javascript
if (window.CustomEvent) {
  var event = new CustomEvent('my-event', { detail: { some: 'data' } });
} else {
  var event = document.createEvent('CustomEvent');
  event.initCustomEvent('my-event', true, true, { some: 'data' });
}

el.dispatchEvent(event);
```

---
