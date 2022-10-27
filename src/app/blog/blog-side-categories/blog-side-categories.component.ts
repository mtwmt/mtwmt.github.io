import { Component, OnInit } from '@angular/core';
import { BlogStoreService } from '../blog-store.service';

@Component({
  selector: 'app-blog-side-categories',
  templateUrl: './blog-side-categories.component.html',
  styleUrls: ['./blog-side-categories.component.scss'],
})
export class BlogSideCategoriesComponent implements OnInit {
  constructor(public blogStoreService: BlogStoreService) {}

  ngOnInit(): void {}

}
