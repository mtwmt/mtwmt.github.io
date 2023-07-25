---
title: jQuery-extend
categories:
  - jquery
tags:
  - jquery
  - JavaScript
date: 2017/09/26
---

這篇應該算是踩雷過後的學習記錄

```js
var a = { a: 1 };
a.aa = $.extend(a, { b: 2 });
```

這樣寫的話 會造成 a 的無窮迴圈

```js
a.aa = $.extend({}, a, { b: 2 });
或;
$.extend(true, a.aa, a, { b: 2 });
```

才能正常的做物件深度合併

#### 參考資料

[http://www.css88.com/jqapi-1.9/jQuery.extend/](http://www.css88.com/jqapi-1.9/jQuery.extend/)
[http://www.runoob.com/jquery/misc-extend.html](http://www.runoob.com/jquery/misc-extend.html)
[https://github.com/jquery/jquery/blob/master/src/core.js#L305](https://github.com/jquery/jquery/blob/master/src/core.js#L305)
