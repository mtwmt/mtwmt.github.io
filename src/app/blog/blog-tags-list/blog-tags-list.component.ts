import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map, Observable, pluck, switchMap, tap } from 'rxjs';
import { BlogService, ListInfo } from '../blog.service';

@Component({
  selector: 'app-blog-tags-list',
  templateUrl: './blog-tags-list.component.html',
  styleUrls: ['./blog-tags-list.component.scss'],
})
export class BlogTagsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 15;
  tag!: string;

  private page$ = this.activatedRoute.queryParams.pipe(
    pluck('page'),
    map((page: number) => page || 1)
  );

  public tagsAllList$ = this.activatedRoute.params.pipe(
    pluck('tag'),
    tap((tag: string) => {
      this.tag = tag;
    }),
    concatMap((tag: string) => {
      return this.blogService.fetchTagsList(tag);
    })
  );

  public tagsList$: Observable<ListInfo[]> = this.page$.pipe(
    switchMap((page: number) => {
      return this.tagsAllList$.pipe(
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
    this.router.navigate(['blog/tags', this.tag], {
      queryParams: {
        page: index,
      },
    });
    scroll(0, 0);
  }
}
