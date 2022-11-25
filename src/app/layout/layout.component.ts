import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { BlogStoreService } from '../blog/blog-store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @HostListener('click', ['$event'])
  onHostClick(e: any): void {
    const isAside = e.target.closest('aside');
    if( !isAside ) {
      this.onClose();
    }
  }

  articleHeight!: number;

  constructor(
    public appService: AppService,
    public blogStoreService: BlogStoreService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {

    // for safari
    const bodyHeight: number = this.document.querySelector('html,body')
      ?.scrollHeight as number;
    const headerHeight: number = this.document.querySelector('header')
      ?.clientHeight as number;
    const footerHeight: number = this.document.querySelector('footer')
      ?.clientHeight as number;
    this.articleHeight = bodyHeight - headerHeight + 150;
  }

  public onClose(): void {
    this.appService.toggleHamburger$.next(false);
  }
}
