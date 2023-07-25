---
title: JS Template Strings ( 模版字串 / 樣版字串 )
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
date: 2020/12/08
---

過去寫法 以 jquery 為例

```js
$('#result').append(
  'There are <b>' +
    basket.count +
    '</b> ' +
    'items in your basket, ' +
    '<em>' +
    basket.onSale +
    '</em> are on sale!'
);
```

上面這種寫法相當繁鎖不方便，ES6 引入了樣版字串解決這個問題

```js
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

---

```js
// 普通字串
`In JavaScript '\n' is a line-feed.` // 多行字串
`In JavaScript this is
 not legal.`;

// 字串裡嶔入變數
let name = 'Bob',
  time = 'today';
`Hello ${name}, how are you ${time}?`;
```

如果在字串裡需要使用到反引號，則前面要用反斜線(逃役字元)轉義

```js
let greeting = `\`Yo\` World!`;
```

所有樣版字串 在使用多行字串時，所有的空格與縮排都是會被保留的，若不想要這個換行 可以使用 `trim` 移除它

```js
$('#list').html(
  `
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim()
);
```

---

在樣版字串裡 嶔入變數，需要將變數寫在 `${}` 之中

```js
let name = 'Bob',
  time = 'today';

// 過去寫法
'Hello ' +
  name +
  ', how are you ' +
  time +
  '?'// es6
  `Hello ${name}, how are you ${time}?`;
```

---

大括號內可以放入任意的 js 表達式，可以用來運算

```js
let x = 1;
let y = 2;

`${x} + ${y} = ${
  x + y
}` // "1 + 2 = 3"
`${x} + ${y * 2} = ${x + y * 2}`; // "1 + 4 = 5"

let obj = { x: 1, y: 2 };

`${obj.x + obj.y}`;
// "3"
```

也能用在函數裡

```js
function fn() {
  return 'Hello World';
}

`foo ${fn()} bar`;
// foo Hello World bar
```

甚至還能用在於

```js
const data = [
  { first: '<Jane>', last: 'Bond' },
  { first: 'Lars', last: '<Croft>' },
];

const tmpl = (addrs) => `
  <table>
  ${addrs
    .map(
      (addr) => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `
    )
    .join('')}
  </table>
`;

console.log(tmpl(data));

// <table>
//   <tr><td><Jane></td></tr>
//   <tr><td>Bond</td></tr>
//
//   <tr><td>Lars</td></tr>
//   <tr><td><Croft></td></tr>
// </table>
```

參考資料：
[字符串的扩展](https://es6.ruanyifeng.com/#docs/string)
[樣板字面值](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Template_literals)
