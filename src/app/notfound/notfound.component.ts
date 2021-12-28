import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, map, retry, tap } from 'rxjs';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.url.pipe(filter((url) => url.length > 0)),
      this.blogService.blogList$,
    ])
      .pipe(
        map(([url, list]) => {
          const segment = url;
          const otherBlogPath = [
            'amp',
            'api_cors_error',
            'api_name_change',
            'googlemap_bounds',
            'typescript',
          ];

          const fildSegment = segment.find((e: any) =>
            otherBlogPath.includes(e.path)
          );
          return list.find((e) => e.slug === fildSegment?.path);
        }),
        filter( v => !!v)
      )
      .subscribe((link) => {
        this.router.navigate(['/blog', link?.layout, link?.slug]);
      });
  }
}
