---
layout: JavaScript
title: JS Object 物件的屬性特徵
categories:
  - JavaScript
tags:
  - JavaScript
date: 2020/11/30
---

## 物件本身

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj', obj);
```

印出來後 如圖所示

<img src="assets/images/object_property/01.jpg" />

修改物件裡面屬性的值可以是 `obj.a = 4` 或 `obj[a] = 4` 這兩種方法都可以

## 進階方式

### Object.defineProperty

定義物件裡的屬性 與 調整屬性特徵

特徵：

1. 值(value) => 對應的值是甚麼
2. 可否寫入(writable) => 可否進行屬性質的修改
3. 可否被刪除(configurable) => 可否可以用 delete 刪除屬性
4. 可否被列舉(enumerable) => 可否利用 for...in 迴圈 將物件屬性列舉出來，可以限制
   特定的屬性是否被列舉出來

實際運用寫法

```javascript
// Object.defineProperty( 物件, 屬性, (參數 = {
//     value: 修改或是賦予的值,
//     writable: boolean,
//     configurable: boolean,
//     enumerable: boolean,
//   })
// );
```

---

試著修改 value 看看

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperty(obj, 'a', {
  value: 4,
  writable: true,
  configurable: true,
  enumerable: true,
});

console.log('obj2', obj);
```

<img src="assets/images/object_property/02.jpg" />

會發現，雖然一開始 a 的值還是 1 ，但是展開以後還是 4，表示顯示已經變化過後的值。

---

再來修改 `writable` ( 可否寫入 ) 這個屬性

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperty(obj, 'a', {
  value: 4,
  writable: false,
  configurable: true,
  enumerable: true,
});

obj.a = 5;

console.log('obj2', obj);
```

<img src="assets/images/object_property/03.jpg" />

結果 `value` 還是一樣為 4 直接跳過 `obj.a = 5;`，這是屬於靜默的錯誤

但若改成嚴僅模式來撰寫

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperty(obj, 'a', {
  value: 4,
  writable: false,
  configurable: true,
  enumerable: true,
});

(function () {
  'use strict';
  obj.a = 5;
})();

console.log('obj2', obj);
```

<img src="assets/images/object_property/04.jpg" />

這時後就不是屬於靜默的錯誤，則是會報錯，意思是說你沒有辦法對於不可寫入的值，重新
賦予一個新的值，而這個錯誤則會導致後面的程式無法繼續執行( 這裡指的是 console.log
)

---

修改 `configurable` ( 可否刪除 ) 這個屬性

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperty(obj, 'a', {
  value: 4,
  writable: false,
  configurable: true,
  enumerable: true,
});

Object.defineProperty(obj, 'b', {
  configurable: false,
});

delete obj.a;
delete obj.b;

console.log('obj2', obj);
```

<img src="assets/images/object_property/05.jpg" />

這時後發現 a 被刪除了 b 還維持著原本的狀態

---

修改 `enumerable` ( 可否被列舉 ) 這個屬性

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperty(obj, 'a', {
  value: 4,
  writable: false,
  configurable: true,
  enumerable: true,
});

for (var key in obj) {
  console.log('obj1', key);
}

Object.defineProperty(obj, 'c', {
  enumerable: false,
});

console.log('obj2', obj);
for (var key in obj) {
  console.log('obj2', key);
}
```

<img src="assets/images/object_property/06.jpg" />

這裡可以看到，我們將 c 的 `enumerable` 改成 `false` 後，這個列舉( 跑 for in 迴圈
後 )就不會出現 c

---

## 新增屬性

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperty(obj, 'd', {
  value: {},
  writable: false,
});

obj.d = 6; // 無法改變值
obj.d.aa = 7; // 值可被賦予;

console.log('obj2', obj);
```

<img src="assets/images/object_property/07.jpg" />

由此可見 `defineProperty` 它只能對當下這個屬性做限制，假設他是一個物件的時後，就
無法對於裡面的直屬性能做限制，所以它只能做到`淺層保護`

---

### Object.defineProperties

可以一次定義大量屬性

寫法

```javascript
// Object.defineProperties(物件, {
//  屬性: {
//    特徵1: ...,
//    特徵2: ...,
//    特徵3: ...,
//    特徵4: ...,
//  }
// })
```

```javascript
var obj = {
  a: 1,
  b: 2,
  c: 3,
};

console.log('obj1', obj);

Object.defineProperties(obj, {
  a: {
    value: 4,
    writable: false,
  },
  b: {
    configurable: false,
  },
});

obj.a = 5;
delete obj.b;
delete obj.c;

console.log('obj2', obj);
```

<img src="assets/images/object_property/08.jpg" />

看!!! 是不是方便多了!
