import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-gotop',
  templateUrl: './gotop.component.html',
  styleUrls: ['./gotop.component.scss']
})
export class GotopComponent implements OnInit {

  public st: number;
  public hh: number;

  @HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
    this.st = this.document.documentElement.scrollTop;
    this.hh = this.document.documentElement.querySelector('header').offsetHeight;

  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngOnInit(): void {
  }

  public scrollToTop(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
