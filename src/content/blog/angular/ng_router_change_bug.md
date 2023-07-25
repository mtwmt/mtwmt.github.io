---
title: Angular Router Change 踩雷日記
categories:
  - Angular
tags:
  - Angular
  - life
date: 2020/09/13
---

最近在專案上出現了一個，點導址按鈕導頁後，出現 api 重覆打的情形
而且還是在特定會在 side bar 點了才會出現這 bug
奇怪了，之前做的都沒遇過這問題呀，寫的方式也都是一樣

花了好多間找問題點 怎麼找都找不到 找過 `router`, `reslover` 各種設定都看過 也都試過了 就還是試不出來 餵狗也餵了好久 就是想不透

就這就盲目的試了好久 花了好多時間
後來 就去上了個洗手間 在解放的過程中 突然想到同事曾經過我說過我這個 bug 的關鍵字 `last navigator to `，當時還拿筆記了下來

但為時已晚 就收收下班回家了

到家後，打了同事說的關鍵字，估狗到了這篇文 [How to determine previous page URL in Angular?](https://stackoverflow.com/questions/41038970/how-to-determine-previous-page-url-in-angular)

試著把網址變化 console 出來
結果發現 原來第二次還有在網址上多加了預設參數

---

專案情境
先取得當下的時間 然後利用當下的時間 去取得 a 資料
再利用 a 資料 當參數取得 b 資料

所以我把參數丟到網址上 當網址有變化時 就會再打一次 api
而我這裡又有設定 網址有變化時 就會去要一次 api

真相一切都大白了!!!
雷都是自己埋的 RRRRRRRRRRRRR

找到問題點後 就好處理了 QQ

---

此篇是為了記念自己逝去的青春 😭😭😭😭
