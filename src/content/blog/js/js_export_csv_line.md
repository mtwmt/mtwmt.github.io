---
title: JS 匯出 CSV 破版
categories:
  - JavaScript
tags:
  - JavaScript
  - ES6
date: 2021/05/23
---

專案裡有很多需要把表格下載成 CSV 檔，最近出現了 CSV 破版的問題

情境如下：

原本某個儲存格裡面的內容裡面有換行，匯出成 CSV 時，照理說，換行應該是在當下儲存格做換行，沒想到卻變成了這樣 QQ

<img src="/assets/images/js/js_export_csv_line/csv1.png" />

---

## 資料來源

<img src="/assets/images/js/js_export_csv_line/data1.png" />

在資料來源裡，可以看到，換行的地方是 `\n` 因為這個`\n` 而導致 CSV 下載後破版 直接換了新一的行

---

## 資料處理

過程中踩了許多雷
使用過 JSON.stringify 轉字串，在 `\n` + 加雙引號 = `"\n"` 失敗
或是把`\n`取代為空白 都不行

最後 才找到了到 要在當下的儲存格裡的字串外要「再」包一層 雙引號 才成功

如下圖
<img src="/assets/images/js/js_export_csv_line/data2.png" />

<img src="/assets/images/js/js_export_csv_line/csv2.png" />

附上 codeapen 可以下載來玩玩看哦!

<iframe src="//codepen.io/mtw/embed/mdWWKyX/"></iframe>
