---
layout: js
title: JS 常用 function 整理
categories:
  - JavaScript
tags:
  - JavaScript
date: 2019/03/15
---

此篇不定時更新, 便利健忘的自己 XD

# 轉 emoji 編碼

```javascript
hex2char = function (code) {
  if (!code) return '';
  var _hex2char = function (hex) {
    var result = '',
      n = parseInt(hex, 16);
    if (n <= 0xffff) {
      result += String.fromCharCode(n);
    } else if (n <= 0x10ffff) {
      n -= 0x10000;
      result += String.fromCharCode(0xd800 | (n >> 10)) + String.fromCharCode(0xdc00 | (n & 0x3ff));
    }
    return result;
  };
  return code.replace(/\\u([A-Fa-f0-9]{4})/g, function (matchstr, parens) {
    return _hex2char(parens);
  });
};
```

---

# 數字在特定長度中補 0

- 利用 10 的次方特性產生需要的長度 再加上本身數字 再利用字串特性移除掉第一位數字

```javascript
function getZero(str, len) {
  return (Math.pow(10, len) + str + '').substr(1);
}
```

---

# 亂數取值

```javascript
function getRandom(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
```

---

# 數字加逗號(千分位進位)

```javascript
function getNumFormat(num) {
  num = num + '';
  return num.replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
}
```

---

# 網址解析

```javascript
function getQS(url) {
  url = url == null ? window.location.href : url;
  var search = url.substring(url.lastIndexOf('?') + 1);
  var obj = {};
  var reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace(reg, function (rs, $1, $2) {
    var name = decodeURIComponent($1);
    var val = decodeURIComponent($2);
    val = String(val);
    obj[name] = val;
    return rs;
  });
  return obj;
}
```

---

# 檔案大小單位轉換

```js
function readablizeBytes(bytes) {
  var s = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes) / Math.log(1024));
  return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + ' ' + s[e];
}
```
