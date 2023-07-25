---
title: 使用 SCSS 建立一個 Palette 產生器
categories:
  - css
tags:
  - css
  - scss
date: 2023/01/10
---

## 建立色系色版

宣告變數，以`500`為主色，

> 500 以下明度會依續遞增彩度降低，驅近於白
> 500 以上明度會依續遞減彩度降低，驅近於黑
> A100 ~ A700 則是改變主色的飽合度

```scss
/* 可以看做是 js 裡的陣列宣告 */
$values: (
  50,
  100,
  200,
  300,
  400,
  500,
  600,
  700,
  800,
  900,
  A100,
  A200,
  A400,
  A700
);
```

這裡的變數宣告能當做是 js 裡的陣列，不過在 scss 裡 沒有 string 與 number 的分別

---

## 顏色生成 function

建立生成器，這裡會用到 sass 裡的內建函式，文章最後附有文件連結

```scss
@function createPalette($color) {
  $white: #fff;
  $black: #000;
  $baseDark: multiply($color, $color);

  $palette: (
    50: mix($color, $white, 12%),
    100: mix($color, $white, 30%),
    200: mix($color, $white, 50%),
    300: mix($color, $white, 70%),
    400: mix($color, $white, 85%),
    500: mix($color, $white, 100%),
    600: mix($color, $baseDark, 87%),
    700: mix($color, $baseDark, 70%),
    800: mix($color, $baseDark, 54%),
    900: mix($color, $baseDark, 25%),
    A100: lighten(saturate(mix($black, $baseDark, 15%), 80%), 65%),
    A200: lighten(saturate(mix($black, $baseDark, 15%), 80%), 55%),
    A400: lighten(saturate(mix($black, $baseDark, 15%), 100%), 45%),
    A700: lighten(saturate(mix($black, $baseDark, 15%), 100%), 40%),
  );

  /* 生成對比色，這裡用使用在文字上 */
  $contrast: ();
  @each $v in $values {
    $contrast: map-merge(
      $contrast,
      (
        $v: getContrast(map-get($palette, $v)),
      )
    );
  }

  /* 將色系與對比系結組合 */
  $palette: map-merge(
    $palette,
    (
      contrast: $contrast,
    )
  );
  @return $palette;
}
```

```scss
@function multiply($rgb1, $rgb2) {
  $r: floor(red($rgb1) * red($rgb2) / 255);
  $g: floor(green($rgb1) * green($rgb2) / 255);
  $b: floor(blue($rgb1) * blue($rgb2) / 255);
  @return rgb($r, $g, $b);
}
```

### 建立判斷色彩亮度函式

```scss
@function getBrightness($color) {
  @return (red($color) * 299 + green($color) * 587 + blue($color) * 114) / 1000;
}

@function isLight($color) {
  @return getBrightness($color) >= 128;
}

@function getContrast($color) {
  @if isLight($color) {
    @return #000;
  } @else {
    @return #fff;
  }
}
```

---

## 使用範例

```scss
$primary-color: #0087dc; //設定主要顏色
$primary-palette: createPalette($primary-color);

@each $key, $val in $primary-palette {
  @if $key != contrast {
    .color-#{$key} {
      background: #{$val};
      color: map-get($primary-palette, contrast, $key);
      &::after {
        content: '#{$val}';
        display: inline-block;
        margin-left: 8px;
      }
    }
  }
}
```

轉成 CSS 後

<img src="/assets/images/css/css_palette_generator/Y30eUVN.png" />

---

## 成果如下

<iframe src="//codepen.io/mtw/embed/XWBMVKL/"></iframe>

參考資料：
[SASS-only Material Angular Palette generator](https://sparagino.it/2020/06/09/sass-only-material-angular-palette-generator/)
[MATERIAL DESIGN](http://mcg.mbitson.com/)

---

## scss 內建函式補充

### color

- mix: https://sass-lang.com/documentation/modules/color#mix
- lighten: https://sass-lang.com/documentation/modules/color#lighten
- saturate: https://sass-lang.com/documentation/modules/color#saturate

### map

- [map-merge](https://sass-lang.com/documentation/modules/map#merge): 將兩組 map 合併成一個新的 map。

### math

- floor: https://sass-lang.com/documentation/modules/math#floor
