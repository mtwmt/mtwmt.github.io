import { DOCUMENT, Location } from '@angular/common';
import { ContentObserver } from '@angular/cdk/observers';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import {
  map,
  Observable,
  ReplaySubject,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { PlatformService } from 'src/app/shared/services/platform.service';

interface Heading {
  text: string;
  level: number;
  classes: string;
  element?: HTMLElement;
  active: boolean;
}

const HEADINGS_CACHE_KEY = makeStateKey('POST_TOC');

@Component({
  selector: 'app-blog-posts-toc',
  templateUrl: './blog-posts-toc.component.html',
  styleUrls: ['./blog-posts-toc.component.scss'],
})
export class BlogPostsTocComponent implements OnInit {
  private _contentElement!: HTMLElement;
  private _contentElement$ = new ReplaySubject<HTMLElement>(1);

  @Input()
  set contentElement(value: HTMLElement) {
    this._contentElement = value;
    this._contentElement$.next(this._contentElement);
  }

  headings$ = this._contentElement$.pipe(
    switchMap((contentElement) => {
      return this.contentObserver.observe(contentElement).pipe(
        map(res => {
          return contentElement;
        })
      );
    }),
    map((element) => {
      return {
        cacheHeadings: this.getCacheHeadings(),
        element,
      };
    }),
    map((data) => {
      if (data.cacheHeadings && data.cacheHeadings.length > 0) {
        if (!this.platformService.isServer) {
          this.removeCacheHeadings();
        }
        return { headings: data.cacheHeadings, element: data.element };
      } else {
        const tocHeadings = this.getTocHeadings(data.element);
        if (this.platformService.isServer) {
          this.setCacheHeadings(tocHeadings);
        }
        return { headings: tocHeadings, element: data.element };
      }
    }),
    map((data) => {
      // client 端重新抓一次 toc
      if (!this.platformService.isServer) {
        return {
          headings: this.getTocHeadings(data.element),
          element: data.element,
        };
      }
      return data;
    }),
    switchMap((data) =>
      this.getContentTocHeadings(data.headings, data.element)
    ),
    startWith(this.getCacheHeadings())
  );

  private _intersectionObserver?: IntersectionObserver | null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private transferState: TransferState,
    private platformService: PlatformService,
    private contentObserver: ContentObserver,
    private location: Location
  ) {}

  ngOnInit(): void {}

  getCacheHeadings() {
    return this.transferState.get<Heading[]>(HEADINGS_CACHE_KEY, []);
  }

  setCacheHeadings(headings: Heading[]) {
    this.transferState.set<Heading[]>(HEADINGS_CACHE_KEY, headings);
  }

  removeCacheHeadings() {
    this.transferState.remove(HEADINGS_CACHE_KEY);
  }

  getContentTocHeadings(headings: Heading[], element: HTMLElement) {
    return new Observable<Heading[]>((subscriber) => {
      // 先回傳目前內容
      subscriber.next(headings);

      if (this.platformService.isServer) {
        subscriber.complete();
        return;
      }

      // client 計算要 active 的 element
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0,
      };

      let visibleElements: HTMLElement[] = [];
      if (this._intersectionObserver) {
        this._intersectionObserver.disconnect();
        this._intersectionObserver = null;
      }

      this._intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleElements = [...visibleElements, entry.target as HTMLElement];
          } else {
            visibleElements = visibleElements.filter(
              (element) => element !== entry.target
            );
          }
        });

        if (visibleElements.length > 0) {
          const visibleElement = visibleElements.sort(
            (a, b) => a.offsetTop - b.offsetTop
          )[0];
          subscriber.next(
            headings.map((head) => {
              return {
                ...head,
                active: head.element?.offsetTop === visibleElement.offsetTop,
              };
            })
          );
        }
      }, options);

      headings.forEach((head) => {
        this._intersectionObserver!.observe(head.element!);
      });
    });
  }

  private getTocHeadings(element: HTMLElement) {
    let result: any[] = [];
    element.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((head) => {
      result = [
        ...result,
        {
          text: head.textContent,
          level: +head.tagName.replace(/h(.)/i, '$1'),
          classes: this.setClasses(head.tagName.toLocaleLowerCase()),
          element: this.platformService.isServer ? null : head,
          active: false,
        },
      ];
    });
    return result;
  }

  private setClasses(header: string) {
    if (header === 'h2') {
      return 'text-base leading-loose';
    } else if (header === 'h3') {
      return 'text-sm pl-2 leading-relaxed';
    } else if (header === 'h4') {
      return 'text-sm pl-4';
    } else {
      return '';
    }
  }

  goTo(target: Heading) {
    this._intersectionObserver!.observe(target.element!);
    if (!!target.text) {
      const elementTop = this.document.getElementById(
        target.element?.id as string
      )?.offsetTop;
      this.location.replaceState(
        `${window.location.pathname}#${target.element?.id}`
      );
      window.scrollTo({ top: elementTop as number - 60, behavior: 'smooth' });
    }
  }
}
