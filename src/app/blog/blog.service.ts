import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import {
  catchError,
  map,
  Observable,
  of,
  tap,
  timeout,
  Subject,
  shareReplay,
  iif,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlatformService } from 'src/app/shared/services/platform.service';
import { MarkdownMeta, parseMarkdownMeta } from 'utils';
import { latestByDate } from '../shared/operators/latest-by-date.operator';

export interface ListInfo {
  directory: string;
  route: string;
  layout: string;
  slug: string;
  title: string;
  date: string;
  update: string;
  tags: string[];
  categories: string[];
  summary: string;
}

const _cacheBlogPostsKey = makeStateKey<ListInfo[]>('blog.json');

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  readonly baseUrl = `${environment.baseUrl}/assets`;

  constructor(
    private httpClient: HttpClient,
    private state: TransferState,
    private platformService: PlatformService
  ) {}

  fetchBlogPosts(directory: string, slug: string): Observable<MarkdownMeta> {
    const url = `${this.baseUrl}/blog/${directory}/${slug}.md`;
    const key = makeStateKey<string>(slug);
    const content = this.state.get<string>(key, '');
    if (content) {
      return of(parseMarkdownMeta(content, slug)!);
    }
    return this.httpClient.get(url, { responseType: 'text' }).pipe(
      timeout(3000),
      catchError(() => of('404')),
      tap((content: string) => {
        if (this.platformService.isServer) {
          this.state.set<string>(key, content);
        }
      }),
      map((content) => parseMarkdownMeta(content, slug)!)
    );
  }

  public blogList$ = iif(
    () => !!this.state.get<ListInfo[] | null>(_cacheBlogPostsKey, null),
    of(this.state.get<ListInfo[] | null>(_cacheBlogPostsKey, null)!),
    this.httpClient.get<ListInfo[]>(`${this.baseUrl}/blog.json`).pipe(
      latestByDate(),
      tap((json: ListInfo[]) => {
        if (this.platformService.isServer) {
          this.state.set<ListInfo[]>(_cacheBlogPostsKey, json);
        }
      })
    )
  ).pipe(shareReplay(1));

  fetchCategoriesList(category: string): Observable<ListInfo[]> {
    return this.blogList$.pipe(
      map((list: ListInfo[]) => {
        const newList = list.filter((item) => {
          return item.categories
            .map((c: string) => c.toLowerCase())
            .includes(category);
        });
        return newList;
      })
    );
  }

  fetchTagsList(tag: string): Observable<ListInfo[]> {
    return this.blogList$.pipe(
      map((list: ListInfo[]) => {
        const newList = list.filter((item) => {
          return item.tags.map((t: string) => t.toLowerCase()).includes(tag);
        });
        return newList;
      })
    );
  }

  readonly getBlogCategories$ = this.blogList$.pipe(
    map((list: ListInfo[]) => {
      const temp = list.map((e) => e.categories);
      const newTemp = [].concat(...(temp as []));
      const categories = Array.from(new Set(newTemp));
      return categories.filter((e) => !!e).sort() as string[];
    })
  );

  readonly getBlogTags$: Observable<string[]> = this.blogList$.pipe(
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

  readonly getBlogLayout$: Observable<string[]> = this.blogList$.pipe(
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
}
