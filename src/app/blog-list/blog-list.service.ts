import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ScullyRoute, ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { Frontmatter } from '../shared/shared.model';
import { map } from 'rxjs/operators';
import { latestByDate } from '../shared/operators/latest-by-date.operator';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogListService {

  blogAllList$: Observable<any[]> = this.scullyRoutesService.available$.pipe(
    map((router) => router.filter((e) => !!e.title)),
    latestByDate()
  );

  blogCategories$: Observable<string[]> = this.blogAllList$.pipe(
    map( (list: ScullyRoute[]) => {
      const temp = list.map( e => e.categories);
      const newTemp = [].concat( ...temp );
      const categories = Array.from( new Set(newTemp) );
      return categories.filter( e => !!e );
    })
  );

  // list 分頁
  blogPageList$: BehaviorSubject<ScullyRoute[]> = new BehaviorSubject([]);

  constructor(
    private httpClient: HttpClient,
    private scullyRoutesService: ScullyRoutesService,
  ) {
  }
}
