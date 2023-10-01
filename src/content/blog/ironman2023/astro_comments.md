---
title: 實作 Astro 組件：文章留言版
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/26
---

一篇文章底下，如果有個留言版，可以讓讀者分享他們的看法、提出問題，今天我們將介紹如何在文章底下新增留言版

如圖所示
<img src="/assets/images/astro/comments/final.jpg" width="80%" />

## 使用 Utterances 建立留言板

[utterances](https://utteranc.es/) 是一個基於 GitHub Issues 的評論系統，它可以讓使用者使用他們的 GitHub 帳戶來發表評論，且內容會存在 `GitHub Issues` 裡。

程式碼如下

```astro
---
---
<div id="comments"></div>

<script>
  const currentTheme = localStorage.getItem("theme");
  const theme = currentTheme === "light" ? "github-light" : "github-dark";
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://utteranc.es/client.js";
  script.setAttribute("repo", "YOUR_USERNAME/YOUR_REPOSITORY");
  script.setAttribute("issue-term", "pathname");
  script.setAttribute("theme", theme);
  script.setAttribute("crossorigin", "anonymous");
  document.querySelector("#comments")?.appendChild(script);
</script>
```

在需要嵌入留言版的地方做一個 `<div id="comments"></div>`

接下來，引入 `utterances` 腳本，它將負責載入並設置 `Utterances` 留言板。

有幾點需要注意的

- 將 `YOUR_USERNAME/YOUR_REPOSITORY` 替換為您的 GitHub 使用者名稱和存儲庫名稱，這樣 Utterances 將知道在哪個存儲庫中創建評論。

- 設定了一個主題 `theme` 變數，根據當前網站主題（亮暗模式）來選擇 Utterances 的外觀樣式。


---

## 總結

完成這些步驟後，您的文章將包含一個嵌入的 `Utterances` 留言板，讓讀者可以輕鬆地分享他們的看法和提出問題。這是一個方便且易於集成的評論系統，讓互動更加豐富。