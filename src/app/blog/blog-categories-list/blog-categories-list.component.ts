import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { map, tap, concatMap, Observable, switchMap } from 'rxjs';
import { BlogService, ListInfo } from '../blog.service';

@Component({
  selector: 'app-blog-categories-list',
  templateUrl: './blog-categories-list.component.html',
  styleUrls: ['./blog-categories-list.component.scss'],
})
export class BlogCategoriesListComponent implements OnInit {
  public pageIndex = 1;
  public pageSize = 15;
  private category!: string;

  private page$ = this.activatedRoute.queryParams.pipe(
    map((params: Params) => {
      return params['page'];
    }),
    map((page: number) => page || 1)
  );

  public categoriesAllList$ = this.activatedRoute.params.pipe(
    map((params: Params) => {
      return params['category'];
    }),
    tap((category: string) => {
      this.category = category;
    }),
    concatMap((category: string) => {
      return this.blogService.fetchCategoriesList(category);
    })
  );

  public categoriesList$: Observable<ListInfo[]> = this.page$.pipe(
    switchMap((page: number) => {
      return this.categoriesAllList$.pipe(
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
    this.router.navigate(['blog/categories', this.category], {
      queryParams: {
        page: index,
      },
    });
    scroll(0, 0);
  }
}
