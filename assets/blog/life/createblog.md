---
layout: life
title: 建置第一個blog
categories:
  - Hexo
tags:
  - Hexo
  - life
date: 2017/06/20
---

一直以來都以為架設一個專屬於自己的 blog 需要一個後台來建置  
後來直到某天在群組裡看到有人分享他的心得文  
其實本來只是要問他頁面上的 js 效果是如何呈現的  
後來他給了我一個答案  
是用 hexo 搭配 next 模板樣式所架設出來的  
好奇心如我，立馬估狗了下  
原來 [hexo](https://hexo.io/zh-tw/docs/) 是用來架設 blog 的套件 它能解析 [markdown](https://www.markdownguide.org/cheat-sheet) 語言!
而且不需要任何後台資料庫就能辦到!

天啊!這不就是我一直以來 在心裡萌芽想找的東西嗎  
先前有一陣子在 gitbook 裡寫了一些自己的學習記錄
就一直在思考著 如果有更好的介面來放 不是件很美好的事嗎!

心動不如馬上行動!  
花了幾天的時間來玩 hexo
慢慢的架設起來
結果花了最久的時間是卡在評論分享這塊
後來才發現 這部份有點像是介接 api 的東西
需要介接的 id-name 來做窗口才得以用來分享討論(這部份經驗太少完全沒想到)

後來估狗了一下 就選定了 [disqus](https://disqus.com/) 來做分享評論
但照著網路上的教學去做 怎麼試就試不成功，為什麼就是接不起來

然後再回去仔細看了下 [next](https://theme-next.iissnan.com/) 的文件  
才發現 原來版本更新 串接的方式也改了
啊啊啊啊!!崩潰
原本的設定是

```yml
disqus_shortname: your-disqus-shortname
```

新版本的設定改為

```yml
disqus:
  enable: false
  shortname: your-disqus-shortname
  count: true
```

再試一次! 成功

此時看看時間，天色已晚，也該睡了 明天還要上班><

- 筆記 [hexo 插入圖片](https://yanyinhong.github.io/2017/05/02/How-to-insert-image-in-hexo-post/)
