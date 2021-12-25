import { ListInfo } from './../blog.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { BlogService } from '../blog.service';

@Injectable({
  providedIn: 'root',
})
export class BlogPostsResolver implements Resolve<boolean> {
  constructor(private blogService: BlogService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.blogService.blogList$.pipe(
      map((list: ListInfo[]) => {
        return list.find((d) => d.slug === route.params['slug']) as ListInfo;
      }),
      switchMap((data) => {
        return this.blogService.fetchBlogPosts(data.directory, data.slug);
      })
    );
  }
}
