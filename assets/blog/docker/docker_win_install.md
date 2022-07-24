---
layout: docker
title: 在 windows 環境下安裝 docker
categories:
  - Docker
tags:
  - Docker
  - life
date: 2022/07/24
---

記錄一下安裝 docker 時所遇到的問題

因為工作上的一些問題 需要在電腦上安裝 docker 測試，裝了後一直噴錯打不開

## 確認虛擬機已開啟

<img src="assets/images/docker/docker_win_install/003.jpg" />

再 cmd 上執行 `docker ps` 則是一直報錯
<img src="assets/images/docker/docker_win_install/002.jpg" />

打開 `Docker Desktop` 就會一直出現這畫面，按下 quit 後，接著就關掉了
<img src="assets/images/docker/docker_win_install/001.jpg" />

---

## 求救

後來才知道還要到 bios 裡做設定， 需要在 cpu 裡開啟虛擬機的功能才可以
<img src="assets/images/docker/docker_win_install/004.jpg" />

接著重開機，打開工作管理員確認
<img src="assets/images/docker/docker_win_install/005.jpg" />

再次執行 `Docker Desktop` 出現新的警示了!!!，原來是 Linux 版本太舊，需要更新
<img src="assets/images/docker/docker_win_install/006.jpg" />

更新中...
<img src="assets/images/docker/docker_win_install/007.jpg" />

更新到一半，海棉大大說 在安裝時，不要選擇 wsl2 就可以執行 docker 了，所以再次重新安裝
<img src="assets/images/docker/docker_win_install/008.jpg" />

成功!!!! 灑花!!!
<img src="assets/images/docker/docker_win_install/009.jpg" />

---

感謝 雷 N、海棉、Gson 等大大們的幫忙 才能順利安裝 docker 並執行

參考資料：
[在 Windows 10 安裝 WSL2 + Docker](https://www.dotblogs.com.tw/yc421206/2021/08/15/install_wsl2_and_docker_in_windows_10)
