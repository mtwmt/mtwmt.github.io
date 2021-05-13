import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, map, pluck, tap } from 'rxjs/operators';
import { BlogListService } from '../blog-list/blog-list.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public blogListService: BlogListService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.activatedRoute.url,
      this.blogListService.blogCategories$
    ]).pipe(
      map(([url, categories]) => {
        const segment = url[0].path;
        const convertCate = categories.map( e => {
          return e.toLowerCase();
        });
        if (convertCate.includes(segment) || segment === 'api_cors_error' ) {
          return url;
        }
      }),
      filter(v => !!v)
    ).subscribe(url => {
      const path = url.map(urlSegment => urlSegment.path );
      this.router.navigate(['/blog', ...path]);
    });
  }

}
