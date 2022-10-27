import { distinctUntilChanged, filter } from 'rxjs/operators';
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
  debounceTime,
  switchMap,
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
  content: string;
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

  fetchSearchList(keyword: string) {
    const getData$ = iif(() => !!keyword, this.blogList$, of([]));

    return getData$.pipe(
      map((list: ListInfo[]) => {
        const newList = list.filter((item) => {
          return item.title.toLocaleLowerCase().includes(keyword);
        });
        return newList;
      })
    );
  }
}
