import { DOCUMENT, Location } from '@angular/common';
import {
  Component,
  HostBinding,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { fromEvent } from 'rxjs';
import { Subject, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BlogListService } from 'src/app/blog-list/blog-list.service';

@Component({
  selector: 'app-blog-nav',
  templateUrl: './blog-nav.component.html',
  styleUrls: ['./blog-nav.component.scss'],
})
export class BlogNavComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();
  nav$: Observable<Element[]>;

  link$: Observable<any> = this.scullyRoutesService.getCurrent().pipe(
    switchMap(page => {
      return this.blogListService.blogAllList$.pipe(
        map(list => {
          const info = list.map((e, i) => {
            let prev;
            let next;
            if (e.title === page.title) {
              prev = list[i - 1];
              next = list[i + 1];

            }
            return {
              prev, next
            };
          }).filter(e => !!e.prev || !!e.next);
          return info[0];
        })
      );
    })
  );

  @HostBinding('class') get classes(): string {
    return 'block';
  }


  constructor(
    @Inject(DOCUMENT) private document: Document,
    private route: ActivatedRoute,
    private location: Location,
    public scullyRoutesService: ScullyRoutesService,
    public blogListService: BlogListService
  ) {}

  ngOnInit(): void {
    // let t = <HTMLAnchorElement>document.getElementById('title'); t.href = '/';
    // let t = document.getElementById('page-title'); t.title = 'Page Title';
    // let t = {} as HTMLAnchorElement; t.href = '/';
    // let t = {}; t.href = '/';

    // console.log('t',t)

    this.nav$ = fromEvent(window, 'AngularReady').pipe(
      map(ev => {
        return Array.from(
          this.document.querySelectorAll('.prose h2,.prose h3,.prose h4')
        );
      })
    );

    fromEvent(window, 'AngularReady')
      .pipe(
        switchMap(ev => this.route.fragment),
        switchMap(fragment =>
          this.scullyRoutesService
            .getCurrent()
            .pipe(map(c => [fragment, c.route]))
        ),
        filter(([fragment, route]) => !!fragment && !!route),
        tap(([fragment, route]) => this.scrollTo(route, fragment)),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  scrollTo(url: string, id: string): void {
    const elementTop = this.document.getElementById(id).offsetTop;
    this.location.replaceState(`${url}#${id}`);
    // this.document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    window.scroll({
      top: elementTop,
      behavior: 'smooth',
    });
  }

  active(url: string, id: string): string {
    return this.location.path(true) === `${url}#${id}` ? 'active' : '';
  }

  scrollToTop(url: string): void {
    this.location.replaceState(`${url}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  headerClasses(header: string): string {
    if (header === 'h2') {
      // return 'text-lg font-semibold';
      return 'text-base leading-relaxed';
    } else if (header === 'h3') {
      return 'text-sm ml-2';
    } else if (header === 'h4') {
      return 'text-sm ml-4';
    }
  }

}
