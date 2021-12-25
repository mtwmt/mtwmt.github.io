import { ListInfo } from './../blog.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable, pluck, shareReplay, switchMap, tap } from 'rxjs';
import { BlogService } from '../blog.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  pageTotal!: number;

  private pageIndex$ = this.activatedRoute.queryParams.pipe(
    pluck('page'),
    map((page: number) => page || 1)
  );

  public page$ = this.pageIndex$.pipe(
    switchMap((page: number) => {
      return this.blogService.blogList$.pipe(
        map((list) => {
          this.pageTotal = list.length;
          this.pageIndex = +page;
          return list.slice((page - 1) * this.pageSize, page * this.pageSize);
        })
      );
    })
  );

  // public page$: Observable<ListInfo[]> = this.blogService.fetchBlogList();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {}

  getPageIndex(index: number) {
    this.pageIndex = index;
    this.router.navigate(['blog'], {
      queryParams: {
        page: index,
      },
    });
  }
}
