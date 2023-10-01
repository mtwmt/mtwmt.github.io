---
title: 實作 Astro 功能：換頁過場動畫 (View Transitions)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/29
---

Astro 3.0 加入了全新的功能 - 視圖轉換（View Transitions），它可以實現頁面之間更平滑的切換效果，無需進行瀏覽器的完整頁面刷新。今天我們就來把之前做過的頁面加上`View Transitions`的效果吧！

## 啟用全站視圖轉換

首先，讓我們將視圖轉換效果應用於整個網站。在您的 Astro 專案裡，打開 `src/components/BaseHead.astro` 這支檔案，並將 `<ViewTransitions />` 組件添加到 <head> 區域，如下所示：

```astro
---
import { ViewTransitions } from 'astro:transitions';
---
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="generator" content={Astro.generator} />

<!-- 主要的元標籤 -->
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<ViewTransitions />

<!-- 其他設定 -->
```

現在，整個網站都已經啟用了視圖轉換效果。

## Dark Mode 切換

原本的 Dark Mode 的 Script 寫法會因加上 `<ViewTransitions />` 效果而導致 dark mode 失效，
接下來將進行 Dark Mode 的調整

開啟 `src/components/Theme.astro` 組件，修改 `script` 如下

```html
<script>
  const toggleTheme = () => {
    const darkMode = () => {
      if (
        typeof localStorage !== "undefined" &&
        localStorage.getItem("theme")
      ) {
        return localStorage.getItem("theme") === "dark" ? true : false;
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return true;
      }
      return false;
    };

    const themeSwitch = document.querySelectorAll("[data-theme-switcher]");

    if (darkMode()) {
      document.documentElement.classList.add("dark");
    }

    [].forEach.call(themeSwitch, function (ts: any) {
      ts.checked = darkMode() ? true : false;
      ts.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        localStorage.setItem(
          "theme",
          document.documentElement.classList.contains("dark") ? "dark" : "light"
        );
      });
    });
  };
  document.addEventListener("astro:after-swap", toggleTheme);

  // 初始執行一次
  toggleTheme();
</script>
```

這樣，Dark Mode 切換功能就能夠與視圖轉換的效果相容了！

---

## 總結

今天，我們學到了：

- 如何使用 Astro 3.0 中的 `<ViewTransitions />`，為網站添加視圖轉換功能。
- 改進和調整 Dark Mode 切換功能，以使其與 `<ViewTransitions />` 效果相容。

範例連結：https://stackblitz.com/edit/withastro-astro-17kfxa

參考資料：
[Astro View Transitions](https://docs.astro.build/en/guides/view-transitions/)