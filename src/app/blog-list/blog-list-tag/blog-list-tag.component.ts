import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogListService } from '../blog-list.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-blog-list-tag',
  templateUrl: './blog-list-tag.component.html',
  styleUrls: ['./blog-list-tag.component.scss'],
})
export class BlogListTagComponent implements OnInit {
  path$: Observable<string>;
  constructor(
    private activatedRoute: ActivatedRoute,
    public blogListService: BlogListService
  ) {}

  ngOnInit(): void {
    this.path$ = this.activatedRoute.params.pipe(
      map(path => {
        if (!Object.keys(path).length) {
          return '..';
        } else {
          return '';
        }
      })
    );

  }

  public resetPage(): void {
    scroll(0, 0);
  }
}
