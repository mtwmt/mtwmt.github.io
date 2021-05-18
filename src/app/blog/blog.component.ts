import { DOCUMENT, Location } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable, fromEvent, Subject } from 'rxjs';
import { tap, takeUntil, first, switchMap, map } from 'rxjs/operators';
import { BlogListService } from '../blog-list/blog-list.service';
import { HighlightService } from '../shared/services/highlight.service';

declare let gtag: Function;

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
  preserveWhitespaces: true,
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogComponent implements OnInit, AfterViewChecked, OnDestroy {

  public st: number;
  public hh: number;

  @ViewChild('scully') scullyElement: any;

  title: string;
  blog$: Observable<ScullyRoute> = this.scullyRoutesService.getCurrent().pipe(
    tap(page => {
      gtag('event', 'page_view', { page_title: page.title, page_path: page.route });
    }),
  );

  allowHighlight = true;
  private destroy$ = new Subject();


  @HostListener('window:scroll', ['$event']) onScroll(e: Event): void {
    this.st = this.document.documentElement.scrollTop;
    this.hh = this.document.documentElement.querySelector('header').offsetHeight;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private location: Location,
    private highlightService: HighlightService,
    public scullyRoutesService: ScullyRoutesService,
    public blogListService: BlogListService
  ) { }

  ngOnInit(): void {
    fromEvent(window, 'AngularReady')
      .pipe(
        takeUntil(this.destroy$),
        tap(() => (this.allowHighlight = false))
      )
      .subscribe(res => {
      });
  }

  ngAfterViewChecked(): void {
    if (this.allowHighlight) {
      this.highlightService.highlightAll();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  scrollTo(url: string, id: string): void {
    const elementTop = this.document.getElementById(id).offsetTop - 110;
    this.location.replaceState(`${url}#${id}`);
    // this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    window.scroll({
      top: elementTop,
      behavior: 'smooth',
    });
  }
}
