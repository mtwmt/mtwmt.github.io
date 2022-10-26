import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.scss'],
})
export class BlogSearchComponent implements OnInit, OnDestroy {
  public keyword: string = '';
  protected onDestroy$ = new Subject<void>();
  constructor(private router: Router, public blogService: BlogService) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSearchChange(keyword: string) {
    this.blogService
      .fetchSearch(keyword)
      .pipe(
        takeUntil(this.onDestroy$),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((res) => {
        this.keyword = keyword;
      });
  }

  onPageChange() {
    console.log('onPageChange');
    this.router.navigate(['blog/search'], {
      queryParams: {
        s: this.keyword,
      },
    });
  }
}
