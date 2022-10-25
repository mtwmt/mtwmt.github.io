---
layout: D3
title: D3 長條圖繪製 ( Bar Chart )
categories:
  - D3
tags:
  - D3
date: 2020/04/13
---

這次我們來繪製的是橫條圖！

## 先準備一筆簡單的資料

```js
data = [
  {
    label: '2011',
    value: 45,
  },
  {
    label: '2012',
    value: 47,
  },
  {
    label: '2013',
    value: 52,
  },
];
```

## 建立一個 svg 畫布

### HTML

```html
<div class="chart"></div>
```

### JS

先建立一些基本變數

```js
const width = 800;
const height = 600;
const margin = 60;
```

```js
let svg = d3
  .select('.chart') //選取要塞入圖表的 tag
  .append('svg') // 塞入一個 svg 的 dom
  .attr('width', width) // 設定 svg 寬
  .attr('height', height); // 設定 svg 高
```

---

## 比例尺設定

```js
const min = d3.min(data, (d) => d.value); // 算出最小值
const max = d3.max(data, (d) => d.value); // 算出最大值

// x 軸比例
const xScale = d3
  .scaleLinear() // 做一個線性比例尺  v3 寫法 scale.linear()
  .domain([min, max]) // 設data值的區間
  .range([margin, width - margin]); //設定自定義區域的範圍

const xAxis = d3.axisBottom(xScale); // 定義坐標軸方向 v3寫法 d3.svg.axis().scale(xScale).orient("bottom");

// y 軸比例
const yScale = d3
  .scaleBand()
  .domain(data.map((d) => d.label))
  .range([height - margin, margin]) //反轉y軸 圖形從底部開始繪製
  .paddingInner(0.2)
  .paddingOuter(0.3)
  .round(true);

const yAxis = d3.axisLeft(yScale);
```

```js
// 繪製坐標
svg
  .append('g')
  .attr('transform', `translate( 0, ${height - margin})`)
  .attr('class', 'xaxis')
  .call(xAxis);

svg
  .append('g')
  .attr('transform', `translate( ${margin}, 0)`)
  .attr('class', 'yaxis')
  .call(yAxis);
```

## 繪製圖表

```js
svg
  .selectAll('.bar') // 選取所有有 bar 名字的 dom
  .data(data) // 把資料餵進去
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('fill', 'orange')
  .attr('x', `${margin}`)
  .attr('y', (d) => yScale(d.label))
  .attr('width', (d) => xScale(d.value) - margin)
  .attr('height', yScale.bandwidth());
```

效果如下： 
<!-- {% iframe //codepen.io/mtw/embed/bGVdeym 100% 400 %} -->
<iframe src="//codepen.io/mtw/embed/bGVdeym/"></iframe>

---

## D3 概念：

[D3 資料綁定與更新](http://localhost:4000/d3/d3_databind/)
[D3 序數比例尺 scaleBand](http://localhost:4000/d3/d3_scaleBand/)
