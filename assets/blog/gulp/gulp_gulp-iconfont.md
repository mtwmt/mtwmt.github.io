---
layout: gulp
title: gulp：gulp-iconfont ( 將 svg 轉 iconfont 字型 )
categories:
  - gulp
tags:
  - gulp
  - node
  - JavaScript
date: 2020/05/29
---

> 將 svg 轉 iconfont 字型

### GULP 設定

```js
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');

function font() {
  const fontName = 'fonts';
  return src('src/svg/*.svg')
    .pipe(
      iconfont({
        fontName: fontName,
        formats: ['ttf', 'eot', 'woff', 'woff2'],
        normalize: true,
      })
    )
    .on('glyphs', function (glyphs, option) {
      src('src/iconfont/*.scss')
        .pipe(
          consolidate('lodash', {
            // 自訂變數 用於 css template
            glyphs: glyphs,
            commonName: 'font', //字型共用設定 className
            fontName: fontName, //設定字型名稱 用於 font-family
            fontPath: '../../fonts/', //字型檔輸出資料夾
            className: 'font-icon', //前綴名稱 編譯出來的名字 font-icon-svgname
          })
        )
        .pipe(dest('src/scss'));
    })
    .pipe(dest('dist/fonts'));
}
```

---

將 svg 輸出成 字型檔後
再來就是 css templpate 的 撰寫了
這裡關係著如何在 css 裡引用字型
可以依個人需求做客製化

這裡稍微參考了一下 `fontawesome` 的用法來建立 css template

```css
@font-face {
  font-family: "<%= fontName %>";
  src: url('<%= fontPath %><%= fontName %>.eot');
  src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot'),
    url('<%= fontPath %><%= fontName %>.woff2') format('woff2'),
    url('<%= fontPath %><%= fontName %>.woff') format('woff'),
    url('<%= fontPath %><%= fontName %>.ttf') format('truetype'),
    url('<%= fontPath %><%= fontName %>.svg#<%= fontName %>') format('svg');
  font-weight: normal;
  font-style: normal;
}

.<%= commonName %> {
  display: inline-block;
  font-family: "<%= fontName %>";
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  font-weight: normal;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.<%= className %>-xs { font-size: .75em; }
.<%= className %>-sm { font-size: .875em; }
.<%= className %>-lg { font-size: 1.33333em; line-height: .75em; vertical-align: -.0667em; }
.<%= className %>-fw { width: 1.2857142857142858em; text-align: center; }
.<%= className %>-2x { font-size: 2em; }
.<%= className %>-3x { font-size: 3em; }
.<%= className %>-4x { font-size: 4em; }
.<%= className %>-5x { font-size: 5em; }
.<%= className %>-7x { font-size: 7em; }
.<%= className %>-10x { font-size: 10em; }

<% _.each(glyphs, function(glyph) { %>
  .<%= className %>-<%= glyph.name %>:before {
    content: "\<%= glyph.unicode[0].charCodeAt(0).toString(16).toUpperCase() %>"
  }
<% }); %>
```

#### html 使用

```html
<i class="font font-icon-svgname"></i>
```

#### 注意事項：

僅限單色 svg 不然在使用上會出錯

### 參考文件

[https://www.npmjs.com/package/gulp-iconfont](https://www.npmjs.com/package/gulp-iconfont)
