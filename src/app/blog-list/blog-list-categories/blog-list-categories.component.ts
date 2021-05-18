import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable, of } from 'rxjs';
import { map, pluck, switchMap } from 'rxjs/operators';
import { BlogListService } from '../blog-list.service';

@Component({
  selector: 'app-blog-list-categories',
  templateUrl: './blog-list-categories.component.html',
  styleUrls: ['./blog-list-categories.component.scss']
})
export class BlogListCategoriesComponent implements OnInit {

  tagList$: Observable<ScullyRoute[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    public blogListService: BlogListService
  ) { }
  ngOnInit(): void {
    this.tagList$ = this.activatedRoute.params.pipe(
      pluck('categories'),
      switchMap((categories: string) => {
        if (!categories) {
          return of([]);
        }
        return this.blogListService.blogAllList$.pipe(
          map((links) => {
            const newLink = links
              .map((link) => {
                if (link.categories?.[0] != null) {
                  link.categories = link.categories.map((e: string) => e.toLowerCase());
                }
                return link;
              })
              .filter(
                (link) =>
                  link.categories?.[0] != null &&
                  link.categories.includes(categories.toLowerCase())
              );
            return newLink;
          })
        );
      })
    );
  }

}
