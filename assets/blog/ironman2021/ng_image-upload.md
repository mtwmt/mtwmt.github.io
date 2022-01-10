---
layout: angular
title: Angular 圖片上傳之日記文
categories:
  - Angular
tags:
  - Angular
  - ironman2021
date: 2021/09/17
---

## 插播

本來預定今天要發佈的文章延後了，今天要要來分享這一兩天的踩雷心路歷，花了一半天時間，連鐵人都沒時間寫，還好有一些些存檔 !

這次公司專案需要做到圖片上傳這部份的處理，因這次的套件對於手動上傳沒有支援太多，所以需要自己處理這部份，接著就是一連串的踩雷過程...

---

## 踩雷開始

一般我們在傳檔給後端的時後，都需要把檔案轉為 `Binary` 上傳文件的格式，

如圖：
![](assets/images/ironman/ng_image-upload/8ZxtHgM.png)

---

因為這次上傳的是圖片，所以也一起將 `http Resquest Headers` 裡的 `responseType` 改為 `blob` (註 1)
改 `blob` 後，發現回傳的 `response` 變這樣
![](assets/images/ironman/ng_image-upload/s11aelm.png)

取不到後端給我的 success 資料

如圖：
![](assets/images/ironman/ng_image-upload/xs8gTsk.png)

因為我需要 success 後，後端回給我的的 imageId 才能接續打下一支 api

---

在公司試了好久，也把所想得到的關鍵字都餵給估狗，一直找不到原因。
到家後，為了重現情境 還到了 `imgur` 圖床申請檔案上傳 api，搞了好久後，終於好了
結果 `imgur` 一直報 429 (\*註 2) 給我就是一直沒辦法傳，大吐血！！！明明我就剛才申請好！！
然後...時間好晚了，放棄先睡覺，隔天再到公司試。

---

後來才發現將 `responseType` 改為 `text`

```js
createImage(formData: any) {
  return this.httpClient
    .post(url, formData, {
      responseType: 'text', //這裡
      reportProgress: true,
      observe: 'events',
      withCredentials: true,
    })
    .pipe(
      tap(event => {
        console.log('createImage', event);
      })
    );
  }
}
```

就能同時得到上傳的進度條與 如圖：

![](assets/images/ironman/ng_image-upload/gRdrrsh.png)

這才結束了半天多的踩雷之旅...
嗯...要說是踩雷嗎？也不算是，只能說自己的經驗太少，很少碰到這一部份，也算是繳了學費(時間) 囧~~~~

---

## 附錄

這個是之前的遇到的問題。
因為一開始在規劃架構時，有在 `interceptors` 裡的 `http Resquest Headers` 加上下面這一行做預設，

```js
'Content-Type': contentType || 'application/json'
```

結果上傳的檔案都變成這種格式
![](assets/images/ironman/ng_image-upload/3fGnVVj.png)

...將上面那一行拿掉就可以成功執行了 !

---

這篇文，是為了我逝去的青春做記念

---

註 1：[XMLHttpRequest.responseType](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType)
註 2：[the server responded with a status of 429 (Too Many Requests) intlTelInput.js](https://stackoverflow.com/questions/31704941/the-server-responded-with-a-status-of-429-too-many-requests-intltelinput-js)
