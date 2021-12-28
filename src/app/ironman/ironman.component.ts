import { map, tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { BlogService, ListInfo } from '../blog/blog.service';
import { BlogSideTagsComponent } from '../blog/blog-side-tags/blog-side-tags.component';

@Component({
  selector: 'app-ironman',
  templateUrl: './ironman.component.html',
  styleUrls: ['./ironman.component.scss'],
})
export class IronmanComponent implements OnInit {
  BlogSideTagsComponent = BlogSideTagsComponent;

  public ironmanList$ = this.blogService.blogList$.pipe(
    map((list: ListInfo[]) => {
      return list.filter((d) => d.layout.includes('ironman2021'));
    }),
  );

  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}
}
