import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendship-link',
  templateUrl: './friendship-link.component.html',
  styleUrls: ['./friendship-link.component.scss'],
})
export class FriendshipLinkComponent implements OnInit {
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
