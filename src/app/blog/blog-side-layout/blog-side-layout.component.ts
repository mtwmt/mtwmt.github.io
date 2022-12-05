import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { BlogStoreService } from '../blog-store.service';

@Component({
  selector: 'app-blog-side-layout',
  templateUrl: './blog-side-layout.component.html',
  styleUrls: ['./blog-side-layout.component.scss'],
})
export class BlogSideLayoutComponent implements OnInit {
  constructor(
    public appService: AppService,
    public blogStoreService: BlogStoreService
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.appService.toggleHamburger$.next(false);
  }
}
