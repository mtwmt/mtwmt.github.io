import { Component, OnInit } from '@angular/core';
import { BlogStoreService } from '../blog-store.service';

@Component({
  selector: 'app-blog-side-tags',
  templateUrl: './blog-side-tags.component.html',
  styleUrls: ['./blog-side-tags.component.scss'],
})
export class BlogSideTagsComponent implements OnInit {
  constructor(public blogStoreService: BlogStoreService) {}

  ngOnInit(): void {}
}
