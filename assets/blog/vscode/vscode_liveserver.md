---
layout: vscode
title: vscode：Live Server 套件
categories:
  - vscode
tags:
  - 擴充套件
  - vscode
date: 2018/11/25
---

Live Server 網頁伺服器 在串接 api 測試的時後非常的好用

## 如何安裝

<img src="assets/images/vscode/liveserver/001.png" />

## 開始設定

依需求在設定裡更改預設配置

```js
{
  "liveServer.settings.donotShowInfoMsg": true,
  "liveServer.settings.useLocalIp": true,
  "liveServer.settings.donotVerifyTags": true,
}
```

`donotShowInfoMsg` 關閉彈出訊息 `useLocalIp` 使用實體 ip 做為連線位址( 寫 rwd 頁
面時很實用 方便手機瀏覽 ) `donotVerifyTags` 關閉 html 缺少的 tag 警告

[Live Server 官方設定檔文件](//github.com/ritwickdey/vscode-live-server/blob/master/docs/settings.md)
