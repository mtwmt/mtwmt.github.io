---
title: D3 v5 與 v3 差異
categories:
  - D3
tags:
  - D3
date: 2019/10/05
---

最近因為專案需求 需要用到 D3 來畫圖表
而公司用的是 v5 版本 (v4 以上的版本已不相容以下版本)

剛開始初入 D3 的我 像個無頭蒼蠅般 先隨意的找了網路上的範例來練習
寫了幾行 code 後 發現怎麼不能 run!!!

爬了下文 才知道 D3 在 v4 版本之後 寫法有些許的改變
而我所找到的教學 與 範例 幾乎都是 v3 版本的寫法

然而 v4 以上版本 的範例 與 介紹 幾乎是少之又少
這就不禁讓我懷疑，到底是我關鍵字下錯 還是在業界上真的很少人使用 v5 版本
能找到的資源都是外國人寫的 (菜英文如我 還是會很想看到中文 RRRR)
亦或是 官方文件寫的太清楚 所以只要看官方文件就夠了
一連串的問號產生????? (是說也沒有很重要 XDD

那...咱們就開始吧！

---

## dom 加上屬性 物件表示法 改 聲明式(串燒)寫法

v3

```js
let svg = d5
  .select('.chart')
  .append('svg')
  .attr({
    width: 800,
    height: 600,
  })
  .style({
    border: '1px solid #159',
    background: '#f5f5f5',
  });
```

v5

```js
let svg = d5
  .select('.chart')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600)
  .style('border', '1px solid #159')
  .style('background', '#f5f5f5');
```

---

## API 命名規則

v3

```js
d3.scale.linear();
```

v5

```js
d3.scaleLinear();
```

其他更詳細可參考 [https://github.com/xswei/d3js_doc/blob/master/API_Reference/CHANGES.md#random-numbersd3-random](https://github.com/xswei/d3js_doc/blob/master/API_Reference/CHANGES.md#random-numbersd3-random)

---

## 用法不同

### 比例尺繪製

```js
let min = d3.min(data, (d) => d.value); // 算出最小值
let max = d3.max(data, (d) => d.value); // 算出最大值
```

v3

```js
let xScale = d3.scale.linear().domain([0, max]).range([0, width]);

let xAxis = d3.svg.axis().scale(xScale).orient('bottom');
```

v5

```js
let xScale = d3.scaleLinear().domain([0, max]).range([0, width]);

let xAxis = d3.axisBottom(xScale);
```

### 顏色表示

v3

```js
let color = d3.scale.category10();

svg.selectAll('.bar').attr({
  fill: (d, i) => color(i),
});
```

v5

```js
var color = d3.scaleOrdinal(d3.schemeCategory10);

svg.selectAll('.bar')
  .attr('fill': (d,i) => color(i))
```

---

### 遠端資料載入

v3
v4 還是一樣寫法

```js
d3.csv('file.csv', function (err, res) {
  if (err) throw err;
  console.log(res);
});
```

v5

```js
d3.csv('file.csv').then(function (res) {
  console.log(res);
});
```

---

以上 是目前在繪製過程中所遇到的情況，我想還應該還有更多我沒遇到的 XDD

參考資料：
[4.x.x 发生了哪些改变](https://github.com/xswei/d3js_doc/blob/master/API_Reference/CHANGES.md)
[D3.js 重大更新！ 4.0 版新鮮功能摘要整理](http://blog.infographics.tw/2016/02/d3-js-4-0-preview/)
[D3: Data-Driven Documents](https://d3js.org.cn/introduce/)
