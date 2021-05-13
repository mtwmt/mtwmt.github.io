import { pluck } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ScullyRoutesService } from '@scullyio/ng-lib';
import { Observable } from 'rxjs';
import { BlogListService } from 'src/app/blog-list/blog-list.service';
import { Frontmatter } from 'src/app/shared/shared.model';

@Component({
  selector: 'app-blog-tag',
  templateUrl: './blog-tag.component.html',
  styleUrls: ['./blog-tag.component.scss']
})
export class BlogTagComponent implements OnInit {

  blog$: Observable<Frontmatter> = this.scullyRoutesService.getCurrent()
    .pipe(
      pluck('tags')
    );

  constructor(
    private scullyRoutesService: ScullyRoutesService,
  ) { }

  ngOnInit(): void {

    // this.blog$.subscribe(res => {
    //   console.log('asds', res)
    // })
  }

}
