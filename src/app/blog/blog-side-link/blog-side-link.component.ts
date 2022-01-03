import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-side-link',
  templateUrl: './blog-side-link.component.html',
  styleUrls: ['./blog-side-link.component.scss'],
})
export class BlogSideLinkComponent implements OnInit {
  friendlyLinks = [
    {
      name: "Mile's Blog",
      url: 'https://mileschou.github.io/',
    },
    {
      name: "雷N's Blog",
      url: 'https://tedmax100.github.io/',
    },
    {
      name: '余小章 @ 大內殿堂',
      url: 'https://dotblogs.com.tw/yc421206/',
    },
    {
      name: '蔣幹話軟體',
      url: 'https://ganhuaking.tw/',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
