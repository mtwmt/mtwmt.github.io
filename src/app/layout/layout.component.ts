import { DOCUMENT } from '@angular/common';
import { Component, HostBinding, Inject, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../app.service';
import { BlogStoreService } from '../blog/blog-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  articleHeight!: number;

  constructor(
    public appService: AppService,
    public blogStoreService: BlogStoreService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    const bodyHeight: number = this.document.querySelector('html,body')
      ?.scrollHeight as number;
    const headerHeight: number = this.document.querySelector('header')
      ?.clientHeight as number;
    // const footerHeight: number = this.document.querySelector('footer')
    //   ?.clientHeight as number;
    this.articleHeight = bodyHeight - headerHeight;

    console.log(this.document.querySelector('html,body')?.scrollHeight);
  }

  public onClose(): void {
    this.appService.toggleHamburger$.next(false);
  }
}
