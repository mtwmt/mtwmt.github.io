import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { pluck, map, tap, concatMap, Observable, switchMap } from 'rxjs';
import { ListInfo, BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss'],
})
export class BlogLayoutComponent implements OnInit {
  public pageIndex = 1;
  public pageSize = 20;
  private layout!: string;
  public title!: string;

  private page$ = this.activatedRoute.queryParams.pipe(
    map((params: Params) => +params['page'] || 1)
  );

  public layoutAllList$ = this.activatedRoute.params.pipe(
    map((params: Params) => params['layout']),
    tap((layout: string) => {
      this.layout = layout;
    }),
    concatMap((layout: string) => {
      return this.blogService.fetchCategoriesList(layout);
    })
  );

  public layoutList$: Observable<ListInfo[]> = this.page$.pipe(
    switchMap((page: number) => {
      return this.layoutAllList$.pipe(
        tap((list) => {
          this.title = list[0].layout;
        }),
        map((list) => {
          this.pageIndex = +page;
          return list.slice((page - 1) * this.pageSize, page * this.pageSize);
        })
      );
    })
  );

  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute,
    public blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.layoutAllList$.subscribe();

    this.layoutList$.subscribe((res) => console.log(res));
  }

  getPageIndex(index: number) {
    this.pageIndex = index;
    this.router.navigate(['blog', this.layout], {
      queryParams: {
        page: index,
      },
    });

    scroll(0, 0);
  }
}
