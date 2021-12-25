import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-side-tags',
  templateUrl: './blog-side-tags.component.html',
  styleUrls: ['./blog-side-tags.component.scss'],
})
export class BlogSideTagsComponent implements OnInit {
  constructor(public blogService: BlogService) {}

  ngOnInit(): void {}
}
