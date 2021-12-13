import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { catchError, map, Observable, of, tap, timeout } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlatformService } from 'src/app/shared/services/platform.service';
import { MarkdownMeta, parseMarkdownMeta } from 'utils';

export interface ListInfo {
  directory: string;
  path: string;
  slug: string;
  title: string;
  date: string;
  tags: string[];
  categories: string[];
  summary: string;
}

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

  fetchBlogList(): Observable<ListInfo[]> {
    const url = `${this.baseUrl}/blog.json`;
    return this.httpClient.get<any>(url).pipe(
      tap((res) => {
        console.log('list', res);
      })
    );
  }

  fetchBlogPosts(directory: string, slug: string): Observable<MarkdownMeta> {
    const url = `${this.baseUrl}/blog/${directory}/${slug}.md`;

    const key = makeStateKey(slug);

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
}
