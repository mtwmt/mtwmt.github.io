---
layout: CSS
title: rwd 自適應文字大小
categories:
  - rwd
tags:
  - css
  - scss
  - rwd
date: 2018/11/27
---

在寫 rwd 頁面縮放的時後，常常會遇到因為視窗做縮放 超出的文字會往下擠
為了不破壞設計的美感，當然也希望文字能做縮放啊！

那文字該如何做設定才能隨著視窗做縮放呢

在這裡我選擇使用 `rem` 這個單位

- `rem` 的文字基準取決於最外層的 html 文字大小，很適合用在整體的尺寸大小切換，以 rem 頁面來說，可以依據不同的尺寸，統一切換整體網頁的文字大小。

畢竟太新的單位 舊的瀏覽器不支援啊...(IE 你懂的

大部份我們拿到設計稿的字型裡面都是使用 `px`
為了減少切版計算時間
以筆者的習慣來說 網頁字型預設大小是 `16px`;

## px to rem

在 scss 裡 先寫一個 px to rem 的 function 來幫助換算

```css
$base-font-size: 16px !default;
@function rem($target, $context: $base-font-size){
  @if $target == 0 { @return 0 }
    @return ($target / $context) + 0rem;
}
```

撰寫 css 時可以這樣寫
`font-size: rem(32px)` 執行後就是 `font-size: 2rem`

## media queries 設定

```css
$device-list: 320px 360px 400px 440px 480px 520px 560px 600px 640px;
@each $current-device in $device-list{
    @media screen and (min-width: $current-device) {
    body, html {
      font-size: $current-device * 0.025;
    }
  }
}
```

筆者的習慣是 640px 以下的視窗寬 開始做字型的縮放
每 40px 一個級距　大約在 `480px` 網頁字型的預設大小就是 `12px`
在 chrome 瀏覽器裡 字型就不在做變化 chrome 最小字級 12px 的限制
但因應各個瀏覽需求，所以還是會寫到 `320px`最小寬度

當然設定值可以依自己的需求做更改

以上 設定完成！
