import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-side-categories',
  templateUrl: './blog-side-categories.component.html',
  styleUrls: ['./blog-side-categories.component.scss'],
})
export class BlogSideCategoriesComponent implements OnInit {
  constructor(public blogService: BlogService) {}

  ngOnInit(): void {}

  public gotopPage(): void {
    scroll(0, 0);
  }
}
