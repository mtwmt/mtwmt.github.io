---
layout: JavaScript
title: JS Array 過濾重覆值的幾種方式
categories:
  - JavaScript
tags:
  - JavaScript
date: 2020/05/04
---

陣列裡 有時後會處理到把重覆的值濾掉，有以下幾種方式

以這個陣列為例
```js
let arr = ['Apple', 'Banana', 'Orange', 'Mango', 'Orange', 'Apple'];
```

---

## filter

```js
function removeRepeat(data) {
  return data.filter((element, index, array) => {
    return array.indexOf(element) === index;
  });
}

console.log(removeRepeat(arr));
// ['Apple', 'Banana', 'Orange', 'Mango']
```

---

## forEach

```js
function removeRepeat(data) {
  let unique = [];
  data.forEach((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}

console.log(removeRepeat(arr));
// ['Apple', 'Banana', 'Orange', 'Mango']
```

---

## reduce

```js
function removeRepeat(data) {
  let unique = data.reduce((acc, cur)=>{
    if(acc.indexOf(cur) < 0){
      acc.push(cur)
    }
    return acc;
  }, []);
  return unique;
}

console.log(removeRepeat(arr));
// ['Apple', 'Banana', 'Orange', 'Mango']
```

## Set (目前最常用的方式)

```js
function removeRepeat(data) {
  return [...new Set(data)];
}

console.log(removeRepeat(arr));
// ['Apple', 'Banana', 'Orange', 'Mango']
```
---

## map

```js
function removeRepeat(data) {
  let unique = [];
  data.map((element) => {
    if (!unique.includes(element)) {
      unique.push(element);
    }
  });
  return unique;
}

console.log(removeRepeat(arr));
// ['Apple', 'Banana', 'Orange', 'Mango']
```


以上
