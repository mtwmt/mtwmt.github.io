---
title: Scully 新增留言系統
categories:
  - Scully
tags:
  - Angular
  - Scully
date: 2021/05/15
---

## 設定 utterances

這次選定了 [utterances](https://utteranc.es/) 來當留言系統，它是使用 github
issue 當成網站的留言系統

先前是使用 `DISQUS` 覺得不是很好用，所以趁著這次翻寫時 也一起換掉了 (雖說也沒什麼人會留言啦 哈哈哈)

先在 github 裡安裝 [utterances app](https://github.com/apps/utterances)
<img src="/assets/images/angular/scully_comments/001.png"/>

接著選定要留言的 repo <img src="/assets/images/angular/scully_comments/002.png"/>

再來設定留言的一些格式 設定完後

utteranc 會提供了這串 script 讓使用頁插入到頁面裡

```js
<script
  src="https://utteranc.es/client.js"
  repo="[ENTER REPO HERE]"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async
></script>
```

---

## Angular 設定

因為我們是要用在 angular 裡，所以稍微修改一下

```ts
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-comments',
  styleUrls: ['./comments.component.scss'],
  template: `<div id="comments"></div>`,
})
export class CommentsComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    const script = this.renderer2.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://utteranc.es/client.js';
    script.setAttribute('repo', '你的github帳號/<你的github帳號>.github.io');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('theme', 'github-light'); // css 樣式設定
    script.setAttribute('crossorigin', 'anonymous');
    script.text = ``;
    this.renderer2.appendChild(
      this.document.querySelector('#comments'),
      script
    );
  }
}
```

ps. 剛開始設定的時後會跑不太出來，稍微等一下下就 OK 了

## 訪客留言門檻

需要有 Github 帳號 才能順利留言哦!!!
