import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { faCheese, faCoffee, faSearch, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil, pluck, switchMap, map, tap } from 'rxjs/operators';
import { BlogListService } from '../blog-list.service';

@Component({
  selector: 'app-blog-list-pagination',
  templateUrl: './blog-list-pagination.component.html',
  styleUrls: ['./blog-list-pagination.component.scss']
})
export class BlogListPaginationComponent implements OnInit, OnDestroy {

  protected destroy$ = new Subject();

  @Input() params: string;
  @Input() name: string;

  public pageSize = 10;
  public totalPage: number;
  public total: Array<number>;
  public correctPage: number;
  public link = [''];
  public pageLimit = 5;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogListService: BlogListService
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        takeUntil(this.destroy$),
        pluck(this.params || ''),
        switchMap((params: string) => {
          return this.activatedRoute.queryParamMap.pipe(
            map((paramMap: ParamMap) => +paramMap.get('page') || 1),
            switchMap((page: number) => {
              return this.blogListService.blogAllList$.pipe(
                map((routes) => {
                  if (params) {
                    return routes.filter((route) => {
                      return (
                        route[this.name]?.[0] != null &&
                        route[this.name][0].toLowerCase() ===
                        params.toLowerCase()
                      );
                    });
                  } else {
                    return routes;
                  }
                }),
                tap((links) => {
                  this.correctPage = page;
                  let totalPage = Math.floor(links.length / this.pageSize);
                  (totalPage % this.pageSize == 0) ? totalPage = totalPage : totalPage = totalPage + 1;
                  this.totalPage = totalPage;

                  const start = page - ((page - 1) % this.pageLimit);
                  const limit = Math.min((page - ((page - 1) % this.pageLimit) + (this.pageLimit - 1)), totalPage);

                  this.total = Array(limit)
                    .fill(limit)
                    .filter((e, i) => {
                      return i < this.pageLimit;
                    }).map((e, i) => {
                      return i + start;
                    })
                    .filter((e, i) => {
                      return e <= totalPage;
                    });
                }),
                map((links) => {
                  return links.slice((page - 1) * this.pageSize, page * this.pageSize);
                }),
              );
            })
          );
        })
      )
      .subscribe((res) => {
        this.blogListService.blogPageList$.next(res);
      });

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }
}
