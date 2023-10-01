---
title: 實作 Astro 組件：新增深色模式 (Dark Mode)
categories:
  - Astro
tags:
  - Astro
  - ironman2023
date: 2023/09/18
---

在前一篇教學中，我們已成功整合了 Tailwind CSS 到我們的 Astro 項目中，並且已經設定好所需的變數。
今天，我們將進一步為我們的網站添加一個常見的功能：深色模式（Dark Mode）。

## 新增 Dark Mode 切換組件

現在，我們將創建一個切換組件來啟用和禁用 Dark Mode。在 `src/components` 資料夾中，建立一個新的 `Theme.astro` 檔案。

```astro
---
---

<div class="theme-switcher">
  <input id="theme-switcher" data-theme-switcher type="checkbox" />
  <label for="theme-switcher">
    <span class="sr-only">theme switcher</span>
    <span>
      <svg
        class="absolute left-[4px] top-[4px] z-10 opacity-100 dark:opacity-0"
        viewBox="0 0 56 56"
        fill="#fff"
        height="16"
        width="16"
      >
        <path
          d="M30 4.6c0-1-.9-2-2-2a2 2 0 0 0-2 2v5c0 1 .9 2 2 2s2-1 2-2Zm9.6 9a2 2 0 0 0 0 2.8c.8.8 2 .8 2.9 0L46 13a2 2 0 0 0 0-2.9 2 2 0 0 0-3 0Zm-26 2.8c.7.8 2 .8 2.8 0 .8-.7.8-2 0-2.9L13 10c-.7-.7-2-.8-2.9 0-.7.8-.7 2.1 0 3ZM28 16a12 12 0 0 0-12 12 12 12 0 0 0 12 12 12 12 0 0 0 12-12 12 12 0 0 0-12-12Zm23.3 14c1.1 0 2-.9 2-2s-.9-2-2-2h-4.9a2 2 0 0 0-2 2c0 1.1 1 2 2 2ZM4.7 26a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4.9c1 0 2-.9 2-2s-1-2-2-2Zm37.8 13.6a2 2 0 0 0-3 0 2 2 0 0 0 0 2.9l3.6 3.5a2 2 0 0 0 2.9 0c.8-.8.8-2.1 0-3ZM10 43.1a2 2 0 0 0 0 2.9c.8.7 2.1.8 3 0l3.4-3.5c.8-.8.8-2.1 0-2.9-.8-.8-2-.8-2.9 0Zm20 3.4c0-1.1-.9-2-2-2a2 2 0 0 0-2 2v4.9c0 1 .9 2 2 2s2-1 2-2Z"
        ></path>
      </svg>
      <svg
        class="absolute left-[4px] top-[4px] z-10 opacity-0 dark:opacity-100"
        viewBox="0 0 24 24"
        fill="none"
        height="16"
        width="16"
      >
        <path
          fill="#000"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.2 2.2c1-.4 2 .6 1.6 1.5-1 3-.4 6.4 1.8 8.7a8.4 8.4 0 0 0 8.7 1.8c1-.3 2 .5 1.5 1.5v.1a10.3 10.3 0 0 1-9.4 6.2A10.3 10.3 0 0 1 3.2 6.7c1-2 2.9-3.5 4.9-4.4Z"
        ></path>
      </svg>
    </span>
  </label>
</div>

<script is:inline>
  const darkMode = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') === 'dark' ? true : false;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  })();

  const themeSwitch = document.querySelectorAll('[data-theme-switcher]');

  if (darkMode) {
    document.documentElement.classList.toggle('dark');
  }

  document.addEventListener('DOMContentLoaded', () => {
    [].forEach.call(themeSwitch, function (ts) {
      ts.checked = darkMode ? true : false;
      ts.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem(
          'theme',
          document.documentElement.classList.contains('dark') ? 'dark' : 'light'
        );
      });
    });
  });
</script>

<style is:global>
  .theme-switcher {
    @apply inline-flex;
  }
  .theme-switcher label {
    @apply relative inline-block h-4 w-6 cursor-pointer rounded-2xl bg-border lg:w-10;
  }

  .theme-switcher input {
    @apply absolute opacity-0;
  }

  .theme-switcher span {
    @apply absolute -top-1 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-dark transition-all duration-300 dark:bg-white;
  }

  .theme-switcher input:checked + label span {
    @apply lg:left-4;
  }

  :is(.dark .theme-switcher span) {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  }

  :is(.dark .dark\:opacity-100) {
    opacity: 1;
  }
</style>
```

---

## 將 Dark Mode 切換組件套用到頁面

接下來，我們將在網頁的 header 中添加 Dark Mode 切換組件。打開 `src/components/Header.astro` 檔案，並修改程式碼如下：

```astro
---
import HeaderLink from "./HeaderLink.astro";
import { SITE_TITLE } from "../consts";
import Theme from "./Theme.astro";
---

<header>
  <nav>
    <h2><a href="/">{SITE_TITLE}</a></h2>
    <div class="internal-links">
      <HeaderLink href="/">Home</HeaderLink>
      <HeaderLink href="/blog">Blog</HeaderLink>
      <HeaderLink href="/about">About</HeaderLink>
    </div>
    <Theme />
  </nav>
  <style>
    header {
      margin: 0;
      padding: 0 1em;
      background: white;
      box-shadow: 0 2px 8px rgba(var(--black), 5%);
    }
    h2 {
      margin: 0;
      font-size: 1em;
    }

    h2 a,
    h2 a.active {
      text-decoration: none;
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    nav a {
      padding: 1em 0.5em;
      color: var(--black);
      border-bottom: 4px solid transparent;
      text-decoration: none;
    }
    nav a.active {
      text-decoration: none;
      border-bottom-color: var(--accent);
    }
  </style>
</header>
```

設定好後，就能看到以下效果囉

<img src="/assets/images/astro/add-dark-mode/002.gif" />

<!-- ![image](../../../assets/images/astro/add-dark-mode/002.gif) -->

範例連結： https://stackblitz.com/edit/withastro-astro-ff5h1y

---

## 總結

今天，我們學到了：

- 如何建立一個 Astro 組件，並將其套用到項目中。
- 如何使用 HTML、CSS 和 JavaScript 來實現一個 Dark Mode 切換組件。
- 如何在 Astro 頁面中使用新創建的組件。

現在，你已經具備了為你的 Astro 項目添加深色模式的知識和能力。這將增加你的網站的用戶體驗，使之更具吸引力和便於使用。
