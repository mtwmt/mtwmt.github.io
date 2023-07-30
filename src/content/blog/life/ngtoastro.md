---
title: 網站再次改版 這次改用 Astro 啦～
categories:
  - life
tags:
  - life
  - astro
date: 2023/07/26
---

## 又改版了

這次再次將整個網站翻寫啦，雖然樣沒什麼改，但整個框架已大改！！！

偶然看到 `Astro` 這個新的框架，整個就是驚為天人啊啊啊

之前被我詬病的 `SEO` 問題，在 `Astro` 應該可以解決掉 XD

這個框架只需要熟悉 HTML 與 CSS 就足夠了，學習曲線相對較低。

相較於之前使用 `Angular` 架設站台的經驗，使用 `Astro` 真的簡便多了。以前因為讀取 Markdown 檔案還需要寫一大堆轉譯方式，但現在這些已被 `Astro` 處理得非常妥善了！

---

## 耗費時程

這次花了大概快一個月才完成，主要是版面延用之前的，之前使用 `Tailwind CSS` 整個搬過非常的方便。
且之前的框架大部份也都拆分好了，只要修改一些語法糖即可。

---

## 佈署問題

佈署時也遇到不少問題，照著官網上的設定一直跑不過 `github` 的 `actions` 在這裡也紀錄一下，剛好在 `Astro` 的 issue 裡都能找到解法

- [Invalid YAML front matter in" - error with Github Pages build process](https://github.com/withastro/astro/issues/6830)
  建立了一個空的 `.nojekyll` 檔放在根目錄

- RSS 問題跑不過
  [Invalid YAML front matter in" - error with Github Pages build process](https://github.com/withastro/astro/issues/6833)
  (照著上面的解法解不掉，後來把 `rss.xml.js` 這支檔裡的 items 改為空陣列才跑過... 這問題還待解)

- github 發佈分支問題  [Branch is not allowed to deploy to github-pages](https://github.com/withastro/docs/issues/1376)

---

## 待辦事項

先記錄一下還沒做的事 XD

- themes 切換
- 分頁修改
- 側邊欄規劃
- 首頁內容 (目前先用文章列表撐下場面)
- 文章回上個列表頁，上一篤、下一篇
- 文章裡的 code 需要有複製功能
- 計算文章閱讀時間 ?

這些好像之前就要做，但一直拖著沒做，然後就忘了啊哈哈哈哈

---

這次改完後 應該不會再改了...吧 XDDD
