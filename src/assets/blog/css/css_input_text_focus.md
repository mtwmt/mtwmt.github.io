---
layout: CSS
title: 簡易 input focus 效果
categories:
  - css
tags:
  - css
  - scss
  - input
date: 2017/07/25
---

## 概念

> input focus 的時後 去後 label 做變化

效果如下：
<!-- {% iframe //codepen.io/mtw/embed/EvxdbW/ 100% 300 %} -->
<iframe src="//codepen.io/mtw/embed/EvxdbW/"></iframe>

### HTML

```html
<div data="input-focus">
  <input type="text" required />
  <label for="">標題</label>
</div>
```

> 記得 input 裡一定要加 required 不然標題會一直卡在上面
> css 注意要加上 -webkit-appearance: none; 這行屬性 取消 ios 的預設樣式
> 效果的話其實有蠻多方式可以呈現的，這時後看的就是創意跟動畫的表現了！

### SCSS

```css
[data='input-focus'] {
  position: relative;
  input {
    outline: none;
    -webkit-appearance: none;
    margin-top: 40px;
    display: block;
    width: 100%;
    font-size: 18px;
    border: 0;
    border-bottom: 1px solid #ccc;
    line-height: 40px;
    &:focus {
      color: #191919;
      border-bottom: 1px solid #0096ff;
    }
    & ~ label {
      position: absolute;
      left: 0px;
      top: 0;
      pointer-events: none;
      transition: all 0.3s;
      line-height: 40px;
      color: #808080;
    }
    &:focus ~ label,
    &:valid ~ label {
      top: -30px;
      font-size: 12px;
      color: #0096ff;
    }
  }
}
```
