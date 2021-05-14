import { Component, OnInit } from '@angular/core';
import { ScullyRoute } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BlogListService } from './blog-list.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {
  links$: Observable<ScullyRoute[]>;
  assetsUrl = environment.assetsUrl;

  constructor(
    public blogListService: BlogListService
  ) {
  }

  ngOnInit(): void {
  }
}
