import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { BlogStoreService } from '../blog-store.service';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-side-categories',
  templateUrl: './blog-side-categories.component.html',
  styleUrls: ['./blog-side-categories.component.scss'],
})
export class BlogSideCategoriesComponent implements OnInit {
  constructor(
    public appService: AppService,
    public blogStoreService: BlogStoreService
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.appService.toggleHamburger$.next(false);
  }
}
