import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListCategoriesComponent } from './blog-list-categories/blog-list-categories.component';
import { BlogListPaginationComponent } from './blog-list-pagination/blog-list-pagination.component';
import { BlogListTagComponent } from './blog-list-tag/blog-list-tag.component';
import { BlogListComponent } from './blog-list.component';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { SharedModule } from '../shared/shared.module';
import { BlogListRoutingModule } from './blog-list-routing.module';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogListPaginationComponent,
    BlogListTagComponent,
    BlogListCategoriesComponent,
  ],
  imports: [CommonModule, BlogListRoutingModule, ScullyLibModule, SharedModule],
})
export class BlogListModule { }
