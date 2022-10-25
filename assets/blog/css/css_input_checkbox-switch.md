---
layout: CSS
title: 如何利用純 css 寫 switch 開關
categories:
  - css
tags:
  - css
  - scss
  - components
date: 2017/06/26
---

## 概念

> 利用 input checkbox 的 checked 特性來做到開關效果

效果如下：
<!-- {% iframe //codepen.io/mtw/embed/pwJxEw/ 100% 300 %} -->
<iframe src="//codepen.io/mtw/embed/pwJxEw/"></iframe>

### HTML

```html
<div data="checkbox-switch">
  <input type="checkbox" id="switch" />
  <label for="switch"></label>
</div>
```

> 可用 html 裡的 data 來當作選取器 避免 classname 過多造成混亂
> 注意!! input 裡的 id 跟 label for 裡的名字記得要一樣 不然不會動 RRRR
> 一個 id 只能取單一個名稱 所以之後要避免取相同名字哦

### SCSS

```scss
[data='checkbox-switch'] {
  position: relative;
  width: 60px;
  height: 30px;
  input[type='checkbox'] {
    opacity: 0;
    & ~ label {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #ccc;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.3s;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0px;
        width: 26px;
        height: 26px;
        border-radius: 50%;
        border: 2px solid #ccc;
        background-color: #fff;
        transition: all 0.3s;
      }
    }
    &:checked ~ label {
      background: #005599;
      &:after {
        left: 30px;
        border-color: #005599;
      }
    }
  }
}
```

### 做成組件客製化使用

| 變數         | 名稱          |
| ------------ | ------------- |
| \$w          | 元件寬        |
| \$h          | 元件高        |
| \$border_w   | 元件鈕邊框寬  |
| \$bg_default | 元件 off 顏色 |
| \$bg_cover   | 元件 on 顏色  |

### SCSS 套用

```scss
[data='checkbox-switch'] {
  @include checkbox-switch(60px, 30px, 2px, #ccc, #159);
}
```

### mixin

```scss
@mixin checkbox-switch($w, $h, $border_w, $bg_default, $bg_cover) {
  position: relative;
  width: $w;
  height: $h;
  input[type='checkbox'] {
    opacity: 0;
    & ~ label {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: $bg_default;
      border-radius: $h;
      cursor: pointer;
      transition: all 0.3s;
      &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0px;
        width: $h - $border_w * 2;
        height: $h - $border_w * 2;
        border-radius: 50%;
        border: $border_w solid $bg_default;
        background-color: #fff;
        transition: all 0.3s;
      }
    }
    &:checked ~ label {
      background: $bg_cover;
      &:after {
        left: $w - $h;
        border-color: $bg_cover;
      }
    }
  }
}
```
