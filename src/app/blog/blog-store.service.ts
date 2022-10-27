import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BlogService, ListInfo } from './blog.service';

@Injectable({
  providedIn: 'root',
})
export class BlogStoreService {
  readonly getBlogCategories$ = this.blogService.blogList$.pipe(
    map((list: ListInfo[]) => {
      const temp = list.map((e) => e.categories);
      const newTemp = [].concat(...(temp as []));
      const categories = Array.from(new Set(newTemp));
      return categories.filter((e) => !!e).sort() as string[];
    })
  );

  readonly getBlogTags$: Observable<string[]> = this.blogService.blogList$.pipe(
    map((list: ListInfo[]) => {
      const temp = list.map((e) => e.tags);
      const newTemp = [].concat(...(temp as []));

      let counts: any = {};
      newTemp.forEach((e: string) => {
        counts[e] = (counts[e] || 0) + 1;
      });

      return counts;
    })
  );

  readonly getBlogLayout$: Observable<string[]> =
    this.blogService.blogList$.pipe(
      map((list: ListInfo[]) => {
        const temp = list.map((e) => e.layout);
        const newTemp = [].concat(...(temp as []));

        let counts: any = {};
        newTemp.forEach((e: string) => {
          counts[e] = (counts[e] || 0) + 1;
        });

        return counts;
      })
    );

  readonly getBlogSearchList$: Subject<ListInfo[]> = new Subject<ListInfo[]>();
  constructor(private blogService: BlogService) {}
}
