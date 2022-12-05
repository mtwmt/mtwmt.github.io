import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { concatMap, map, Observable, switchMap, tap } from 'rxjs';
import { BlogService, ListInfo } from '../blog.service';

@Component({
  selector: 'app-blog-layout-list',
  templateUrl: './blog-layout-list.component.html',
  styleUrls: ['./blog-layout-list.component.scss'],
})
export class BlogLayoutListComponent implements OnInit {
  public pageIndex = 1;
  public pageSize = 20;
  private layout!: string;

  private page$ = this.activatedRoute.queryParams.pipe(
    map((params: Params) => {
      return params['page'];
    }),
    map((page: number) => page || 1)
  );

  public layoutAllList$ = this.activatedRoute.params.pipe(
    map((params: Params) => {
      return params['layout'];
    }),
    tap((layout: string) => {
      this.layout = layout;
    }),
    concatMap((layout: string) => {
      return this.blogService.fetchLayoutList(layout);
    })
  );

  public layoutList$: Observable<ListInfo[]> = this.page$.pipe(
    switchMap((page: number) => {
      return this.layoutAllList$.pipe(
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

  ngOnInit(): void {}

  getPageIndex(index: number) {
    this.pageIndex = index;
    this.router.navigate(['blog/layout', this.layout], {
      queryParams: {
        page: index,
      },
    });
  }
}
