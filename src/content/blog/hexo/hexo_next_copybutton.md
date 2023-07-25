---
title: hexo：Next 一鍵複製程式碼
categories:
  - Hexo
tags:
  - Hexo
date: 2019/10/05
---

最近發現新版 Next 7 版有支援一鍵複製程式碼的功能之前還傻傻的自己套
`clipboard.js` 來用 想不到早就有內建了 XDDD

## 開啟一鍵複製功能

只要到 `_config.yml` 裡 的 390 行下 找到 `copy_button` 將 `enable` 改 `true` 即
可

檔案位子如下圖
<img src="/assets/images/hexo/next_copybutton/config.jpg"  width=250px />
<img src="/assets/images/hexo/next_copybutton/codeblock.jpg"/> 分別提供了 `flat`
與 `mac` 樣式

---

## 修改預設樣式

但預設 像這樣只有 `複製` 兩個字 就覺得沒有很好看

<img src="/assets/images/hexo/next_copybutton/001.jpg"  width=100% />

想改成 icon 呈現

<img src="/assets/images/hexo/next_copybutton/002.jpg"  width=100% />

爬了一下原始碼 找到了修改的地方在 themes/next 的主題的資料夾裡往下找
themes/next/source/js/utils.js 找到 `utils.js` 這支檔案

<img src="/assets/images/hexo/next_copybutton/003.jpg"  width=250px />

接著約在 50 行有一個註解寫著 `One-click copy code support.` 往下找到 initButton
這個 function

```js
function initButton(button) {
  if (CONFIG.copycode.style === 'mac') {
    button.html('<i class="fa fa-clipboard"></i>');
  } else {
    // button.text(CONFIG.translation.copy_button);
    button.html('<i class="fa fa-clipboard"></i>');
  }
}
```

將原本 `button.text(CONFIG.translation.copy_button);` 這行刪掉 或 註解起來改
`button.html('<i class="fa fa-clipboard"></i>');` 就可以囉

順帶一提 next 7 支援 fontawesome 4.7 版若是不喜歡這個 icon 樣式 也能直接到
[fontawesome 官網](https://fontawesome.com/v4.7.0/)裡找 自己喜歡的 icon 替換
