import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-gotop',
  templateUrl: './gotop.component.html',
  styleUrls: ['./gotop.component.scss'],
})
export class GotopComponent implements OnInit {
  public st: number = 0;
  public hh: number = 0;

  @HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
    this.st = this.renderer.selectRootElement('html, body', true).scrollTop;
    this.hh = this.renderer.selectRootElement('header', true).offsetHeight || 0;
  }

  constructor(private renderer: Renderer2) {}
  ngOnInit(): void {}

  public scrollToTop() {
    this.renderer.selectRootElement('body, html', true)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }
}
