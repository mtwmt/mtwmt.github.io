---
title: Samsung Galaxy A50 root
categories:
  - life
tags:
  - life
  - mobile
  - root
  - 刷機
date: 2019/08/27
---

# ROOT 機型 Samsung Galaxy A50 (SM-A505GN/DS)

# 請詳閱以下公開說明書再刷機

- 請先備份所有重要資料
- 刷機有風險，失敗手機掛點一概不負責，請仔細考慮清楚

## 檔案準備

- 三星驅動程式
  [SAMSUNG_USB_Driver_for_Mobile_Phones.zip (35.12MB)](https://developer.samsung.com/galaxy/others/android-usb-driver-for-windows)

- 刷機程式 [Odin3_v3.13.1](https://odindownload.com/)

- [MagiskManager-v7.3.2.apk](https://github.com/topjohnwu/Magisk/releases/download/manager-v7.3.2/MagiskManager-v7.3.2.apk)

- [Samsung Galaxy A50 SM-A505GN/DS Repair Firmware](https://boycracked.com/portfolio/samsung-galaxy-a50-sm-a505gn-ds-repair-firmware/)
  下載 下列這五個 md5 檔案 <img src="/assets/images/A50_root/download.jpg" />

## A50 按鍵組合

強制關機 `音量下鍵 + 電源鍵` 兩個按著不放約七秒開啟 download 畫面 `在關機模式時`
`音量上鍵 + 音量下鍵 + 插入type-c線`

## 步驟

1. OEM 解鎖：設定 > 關於手機 > 軟體資訊 > 版本號碼( 點擊 5~8 次 ) 會跳出
   `開發者模式`> 回到設定下面會多出 `開發人員選項` 接著把 OEM 解鎖 與 USB 偵錯
   這兩個選項都打開 接著將手機完全關機

2. 完全關機後 按著 `音量上鍵 + 音量下鍵 + 插入type-c線` 選第二個 `長按音量上鍵`
   <img src="/assets/images/A50_root/root01.jpg"  width="60%"/> 會進入解鎖模式 (
   忘了拍) 再按一次 `音量上鍵` (註:一旦解鎖 oem 鎖，原本在手機裡的資料就會全部消
   失。執行前請三思！) 接下來會自動關機又開機

3. 開機時會出現 `淺藍底白色的安卓機器人`畫面 接著會再自動重新開機 出現新機設定設
   定完後 再執行一次第一點 把 `開發者模式` 打開 再設定一次
   <img src="/assets/images/A50_root/root02.jpg"  width="60%"/> 會看到 OEM 解鎖
   已經變成灰色 不能更改 這時才真的是解鎖成功 ( 如果還沒變灰色 表示失敗 重覆步驟
   2 再來一次)

4. 再來將
   `AP_A505GNDXU1ASBA_CL15423456_QB22223752_REV00_user_low_ship_meta_OS9.tar.md5`
   與`MagiskManager-v7.3.2.apk` 這兩支檔案 放到手機裡的 download 資料夾接著安裝
   `MagiskManager-v7.3.2.apk` 再來執行 `MagiskManager` 如下面影片中的步驟

<iframe width="560" height="315" src="https://www.youtube.com/embed/s2Xp-lQg1xs?start=470" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

5. <img src="/assets/images/A50_root/root03.jpg" width="60%"/> 跑完這個畫面後 在
   手機的 download 資料夾裡 會多出一個 `magisk_patched.tar` 這個檔案，把它存到電
   腦上 我們要用這個檔案來刷機 然後 將手機完全關機

6. 完全關機後 按著 `音量上鍵 + 音量下鍵 + 插入type-c線` 進入畫面淺藍色後 選第一
   個 `短按音量上鍵` 會進入圖中這畫面確認 OEM LOCK OFF 後 就準備刷機囉
   <img src="/assets/images/A50_root/root04.jpg" width="60%"/>

7) 打開 `Odin3` 如圖 切換到 options 記得將 `auto reboot` 點掉再將剛剛做好的
   `magisk_patched.tar` 拉到 AP 上 接著按 start 開始刷機
   <img src="/assets/images/A50_root/root05.jpg" /> 成功後會出現 左上角會出現 綠
   色 pass! 失敗會出現 紅色 fail! (就變磚了) 後續會教如何救

8) 接著拔掉傳輸續，按著 `音量下鍵 + 電源鍵` 關機

- 營幕熄掉後 馬上按著 `音量上鍵 + 電源鍵`
- 看到警告畫面時放開`電源鍵` 成功的話會進入原廠的 recovery，如果是出現 SAMSUNG
  的 logo 的話，請立刻重新按 `著音量下鍵和電源鍵` 7 秒再重覆第八步驟直到成功進入
  recovery

9. 進入 recovery，找到 Wipe data/factory reset (註:音量上下鍵是切換選項、電源鍵
   則是確定鍵) 將資料重設

10. 重設完成後找到 `Reboot system now` 把手機重新開機 > 按下去的同時請立刻按著電
    源鍵和音量上鍵 > 出現警告畫面再放開

11. 如果成功，手機會自動重新開機兩次，重新開機的過程會有些不自然(像死當那樣重開
    ，屬於正常現象)，會再次出現新機設定的頁面，完成新機設定之前都有可能會自動重
    開(也是正常現象)

12. 程式集裡應該會多了 magisk manager，如果沒有的話 再安裝一次
    MagiskManager-v7.3.2.apk (需要連上網) 出現 已安裝 就表示 root 成功了
    <img src="/assets/images/A50_root/root06.jpg" width="60%" />

## 影片參考

ps 因影片上所刷的機子不是 A50 所以在一些手勢上會不太一樣 請參考上面的按鍵組合
https://www.youtube.com/watch?v=s2Xp-lQg1xs

---

# 救磚

1. 刷機失敗後 營幕如圖 <img src="/assets/images/A50_root/gg01.jpg" width="60%" />

2. 接著打開 `Odin3` 將之前下載的 md5 放上去 照著檔名開頭放 按下 start
   <img src="/assets/images/A50_root/gg02.jpg"/>

3. 按下 start 後 手機會開始跑等重新開機後 手機就救回來了
   <img src="/assets/images/A50_root/gg03.jpg" width="60%" />

---

花了一整天才刷機成功

神魔不能轉的原因 我想應該是 這個問題要把 se 狀態 從 Enforcing 改成 Permissive 但
目前在網路上找到的方法完全改不動 只能看看還有沒有神提供修改過後的 img 檔來刷機了

<img src="/assets/images/A50_root/selinux.jpg" width="80%"/>

---

參考資料
[How to Root Galaxy S10, S10e, S10 Plus, or A50! [Exynos Only]](https://www.youtube.com/watch?v=s2Xp-lQg1xs)
[[教學] Galaxy A50 root 安裝教學(magisk) 測試中~](https://apk.tw/thread-914293-1-1.html)
