import { ListInfo } from './../blog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, filter, distinctUntilChanged, switchMap, Observable, tap } from 'rxjs';
import { BlogStoreService } from '../blog-store.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-search-list',
  templateUrl: './blog-search-list.component.html',
  styleUrls: ['./blog-search-list.component.scss'],
})
export class BlogSearchListComponent implements OnInit {
  keywords!: string;
  queryList$: Observable<ListInfo[]> = new Observable<ListInfo[]>();

  constructor(
    public activatedRoute: ActivatedRoute,
    public blogService: BlogService,
    public blogStoreService: BlogStoreService
  ) {}

  ngOnInit(): void {
    this.queryList$ = this.activatedRoute.queryParams.pipe(
      map((params: Params) => {
        return params['k'];
      }),
      distinctUntilChanged(),
      tap((k) => {
        this.keywords = k;
      }),
      switchMap((k) => {
        return this.blogService.fetchSearchList(k);
      })
    );
  }
}
