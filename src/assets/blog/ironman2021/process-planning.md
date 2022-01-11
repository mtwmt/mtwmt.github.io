---
layout: life
title: 程式碼流程規劃之日記文
categories:
  - life
tags:
  - life
  - ironman2021
date: 2021/09/18
---

今天，依然是篇日記文，每天遇到的事有太多好寫了。

一早
同事：Mandy, 今天是 deadline 囉，做好了嗎?
我：還差了 bala bala...
同事：有什麼需要協助的話，要快說哦
我：嗯...好 ! XD

接著繼續處理未完的專案

---

## 情境

這次的情境是，表單裡有包含著圖片上傳，機制是當表單需要
新增圖片時，需要先將圖檔上傳，得到後端給的圖片 id 後再把這個 id 塞到表單裡
更新圖片時，把原有的圖檔 id 包含新的圖檔一起傳送給後端，
刪除圖片時，就要把原有的圖片 id 打到後端
以上這些動作都要先處理完，接著再一起更新表單

所以流程會是，先傳送圖片，等圖片處理完後更新表單，再將表單送出。

---

## 實作

一開始我的程式碼是這樣寫的
![](assets/images/ironman/process-planning/u2TPLuf.png)

結果遇到了圖片非同步問題，當我按 `submit` 後，每傳完一張圖片，就會打一次表單 api,
傳了三次 表單送出就會打三次，這不是我要的RRRR !

---

## 修改後

將程式碼流程改這樣
![](assets/images/ironman/process-planning/vY7D11q.png)

是我要的結果！但其實這樣寫下來 邏輯上有點複雜
但時程上有點趕，就先將 code 傳到 gitlab 上

---

## CodeReview

經過同事神一般的巧手，將程式碼的流程改為如圖所示，流程看起來清楚多了(心裡充滿感激)
![](assets/images/ironman/process-planning/YooG1uC.png)

`action`是`ngrx`裡的狀態管理的一部份

`combineLatest` 為 rxjs 裡的組合符
`concatMap` 與 `switchMap` 皆是 rxjs 裡的 operators


concatMap 還有另外處理邏輯(crud)流程

---

## 後記

今天，主要的記事是對程式碼的流程規畫，所以沒有實作面
這次也學到了`concatMap`的處理方式 
(看了很多次 還沒實際使用過，所以一開始在使用時，對`concatMap`的流向有所誤解)

這天在回家的路上，火車坐過頭，連 ubike 也騎超過站點忘了要還車 QQ
一定是我太累惹 囧~~
