---
title: input chexcbox
categories:
  - css
tags:
  - css
  - scss
  - input
date: 2017/06/23
---

## 概念

> 利用 css before、after 的特性 去修改裡面的 input 樣式
> 在 before 裡畫出一個 ✔
> 使用矩形其中兩個長寬邊畫 border 線條
> 再利用 css3 rotate 屬性 旋轉 45 度 讓長寬兩個邊看起來像 ✔
> 再來 將其比例縮小到 scale 0 點下去後 再還原至原本大小 scale 1

> after 畫下面底框，蓋住原本 checkbox 的樣式

> 完成！

效果如下：

<!-- {% iframe //codepen.io/mtw/embed/xrpXKw/ 100% 300 %} -->
<iframe src="//codepen.io/mtw/embed/xrpXKw/"></iframe>

### HTML

```html
<div data="checkbox-check">
  <input type="checkbox" id="check" />
  <label for="check">ITEM</label>
</div>
```

### SCSS

```css
[data='checkbox-check'] {
  position: relative;
  display: inline-block;
  line-height: 24px;
  input[type='checkbox'] {
    & ~ label {
      &:before {
        content: '';
        position: absolute;
        z-index: 1;
        top: 3px;
        left: -3px;
        width: 18px;
        height: 10px;
        border: 4px solid #191919;
        border-top-style: none;
        border-right-style: none;
        vertical-align: top;
        transition: transform 0.4s cubic-bezier(0.45, 1.8, 0.5, 0.75);
        transform: rotate(-45deg) scale(0, 0);
      }
      &:after {
        vertical-align: top;
        content: '';
        position: absolute;
        z-index: 0;
        top: 0;
        left: -6px;
        border: 1px solid #808080;
        width: 24px;
        height: 24px;
        background: #fff;
        cursor: pointer;
      }
    }
    &:checked ~ label {
      &:before {
        transform: rotate(-45deg) scale(1, 1);
      }
    }
  }
}
```
