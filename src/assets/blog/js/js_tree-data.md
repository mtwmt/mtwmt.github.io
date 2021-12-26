---
layout: js
title: 樹狀結構的各種處理 (Tree Data Structure)
categories:
  - JavaScript
tags:
  - JavaScript
date: 2021/10/27
---

最近為了處理 `tree` 的樹狀結構多了好幾根白頭髮，囧~~~

## Tree Data

這是一筆 tree (樹) 的資料

```json
const data = [
  {
    id: "1",
    children: [
      {
        id: "1-1",
        children: [
          {
            id: "1-1-1",
            children: [],
          },
          {
            id: "1-1-2",
            children: [],
          },
        ],
      },
      {
        id: "1-2",
        children: [],
      },
    ],
  },
  {
    id: "2",
    children: [
      {
        id: "2-1",
        children: [],
      },
    ],
  },
  {
    id: "3",
    children: [
      {
        id: "3-1",
        children: [],
      },
      {
        id: "3-2",
        children: [
          {
            id: "3-2-1",
            children: [],
          },
          {
            id: "3-2-2",
            children: [],
          },
        ],
      },
      {
        id: "3-3",
        children: [],
      },
    ],
  },
  {
    id: "4",
    children: [
      {
        id: "4-1",
        children: [],
      },
    ],
  },
];
```

---

## 找出 ID 裡的資訊

```js
const findNode = function (cond, root = []) {
  for (const node of root) {
    if (cond(node) || findNode(cond, node.children)) {
      return cond(node) ? node : findNode(cond, node.children);
    }
  }
  return null;
};

console.log(
  "node",
  findNode((node) => node.id === "3-2-1", data)
);
```

---

## 找出 ID 的根目錄

```js
const findRoot = function (cond, root = []) {
  for (const node of root) {
    if (cond(node) || findNode(cond, node.children)) {
      return node;
    }
  }
  return null;
};

console.log(
  "root",
  findRoot((node) => node.id === "3-2-1", data)
);
```

---

## 列出 ID 的路徑

```js
const findPath = function (cond, root = [], data = [root]) {
  for (const node of root) {
    if (cond(node)) {
      return data;
    }
    const path = findPath(cond, node.children, [...data, node.children]);
    if (!!path) {
      return path;
    }
  }
  return null;
};

console.log(
  "root",
  findPath((node) => node.id === "3-2-1", data)
);
```

參考資料：
[The Tree data structure](https://blog.benoitvallon.com/data-structures-in-javascript/the-tree-data-structure/)
