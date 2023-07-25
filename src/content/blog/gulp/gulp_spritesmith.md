---
title: Gulp：自動化 rwd css sprite ( 自適應雪碧圖 )
categories:
  - Gulp
tags:
  - Gulp
  - node
  - JavaScript
date: 2017/06/26
update: 2020/05/23
---

> 將許多 icon 小圖轉換成大圖 做成 sprite

_於 20200523 更新 拿掉舊有寫法 加上新的 cssTemplate_

這次更新是因為把之前寫的很醜的 cssTemplate 翻新重寫
也因為個人需求 在 sprite 載入的圖檔轉成 base64 加載
且將單位 px 轉為 rem 方便寫 rwd 網頁上使用

---

### gulp.spritesmith 官方提供設定 code

```javascript
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

// 將 spritesmith 的 img,scss 分開輸出 需加裝 merge
var merge = require('merge-stream');

gulp.task('sprite', function () {
  var spriteData = gulp.src('images/*.png').pipe(spritesmith({
      imgName: 'sprite.png',
      cssName: 'sprite.css'
    }
  }));
return spriteData.pipe(gulp.dest('path/to/output/'));
});

```

---

### 個人修改調整後

```js
const gulp = require('gulp');
const sass = require('gulp-sass');
const spritesmith = require('gulp.spritesmith');
const merge = require('merge-stream');
const base64 = require('gulp-base64-inline');

function sprite() {
  let spriteData = src('src/images/sprite/**/*.png').pipe(
    spritesmith({
      imgName: 'sprite.png',
      cssName: '_sprite.scss',
      imgPath: 'sprite.png',
      padding: 10,
      cssTemplate: (data) => {
        let spriteArr = [];
        data.sprites.forEach(function (sprite) {
          spriteArr.push(`
            .${sprite.name} {
              display: block;
              width: ${sprite.width / 16}rem;
              height: ${sprite.height / 16}rem;
              background-size: ${
                (data.spritesheet.width / sprite.width) * 100
              }%  ${(data.spritesheet.height / sprite.height) * 100}%;
              background-position: 0 ${
                ((-1 * sprite.offset_y) /
                  (data.spritesheet.height - sprite.height)) *
                100
              }%;
            }
          `);
        });
        spriteArr.push(`
          .${data.options.spriteName}{ background-image: inline('${data.spritesheet.image}'); }
        `);
        return spriteArr.join('');
      },
      cssFormat: 'scss',
      algorithm: 'top-down',
      cssOpts: {
        spriteName: 'icon',
      },
    })
  );
  let cssStream = spriteData.css.pipe(prettier()).pipe(dest('src/scss'));
  let imgStream = spriteData.img.pipe(dest('src/images/img'));

  return merge(imgStream, cssStream);
}

function css() {
  return src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'compact',
        includePaths: [''],
      }).on('error', sass.logError)
    )
    .pipe(base64('../images/img'))
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css'));
}
```

#### 注意事項：

需將檔案轉存為 scss 檔 才能將圖檔編譯成 base64 編碼
也需要另外加載 [gulp-base64-inline](https://www.npmjs.com/package/gulp-base64-inline) 在 css 編譯時做轉檔

在 html 引用上，要再多加上圖片檔的 class 名稱
例如 spriteName 上寫的是 icon
圖檔的名字是 file

```html
<i class="icon file"></i>
```

---

### 參數說明

- imgName 轉成大圖後的物件名稱
- cssName 編譯後的 css 名稱
- cssFormat 格式化生成檔 支援以下 css (CSS), .sass (SASS), .scss - (SCSS), .less (LESS), .styl/.stylus (Stylus), and .json (JSON)
- imgPath 對應物件路徑檔案
- padding icon.png 中圖片間距
- algorithm icon 合成後 圖片排法 [https://github.com/twolfson/layout](https://github.com/twolfson/layout)
- cssTemplate 設定 css 產生格式，這裡可以用 handlebars 的格式來撰寫 [https://github.com/twolfson/spritesheet-templates#documentation](https://github.com/twolfson/spritesheet-templates#documentation)
- cssOpts 設定自訂 css 產生程式變數

---

### 參考文件

- [https://www.npmjs.com/package/gulp.spritesmith](https://www.npmjs.com/package/gulp.spritesmith)
- [https://www.w3ctrain.com/2015/12/09/generating-sprites-with-gulp/](https://www.w3ctrain.com/2015/12/09/generating-sprites-with-gulp/)
- [http://milkmidi.blogspot.tw/2017/04/gulp-spritesheet.html](http://milkmidi.blogspot.tw/2017/04/gulp-spritesheet.html)
