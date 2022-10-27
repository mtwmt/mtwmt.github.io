import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-blog-search',
  templateUrl: './blog-search.component.html',
  styleUrls: ['./blog-search.component.scss'],
})
export class BlogSearchComponent implements OnInit {
  public keyword: string = '';
  constructor(
    private router: Router,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        map((params: Params) => {
          return params['k'];
        })
      )
      .subscribe((k) => {
        this.keyword = k;
      });
  }

  onSearchChange() {
    this.router.navigate(['blog/search'], {
      queryParams: {
        k: this.keyword,
      },
    });
  }
}
