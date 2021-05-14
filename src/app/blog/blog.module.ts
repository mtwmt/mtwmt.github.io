import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogNavComponent } from './blog-nav/blog-nav.component';
import { SharedModule } from '../shared/shared.module';
import { BlogDonateComponent } from './blog-donate/blog-donate.component';
import { BlogListTagComponent } from '../blog-list/blog-list-tag/blog-list-tag.component';
import { BlogTagComponent } from './blog-tag/blog-tag.component';
import { BlogListCategoriesComponent } from '../blog-list/blog-list-categories/blog-list-categories.component';
import { BlogListPaginationComponent } from '../blog-list/blog-list-pagination/blog-list-pagination.component';
import { BlogListComponent } from '../blog-list/blog-list.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';

@NgModule({
  declarations: [
    BlogListComponent,
    BlogListPaginationComponent,
    BlogListTagComponent,
    BlogListCategoriesComponent,
    BlogComponent,
    BlogNavComponent,
    BlogDonateComponent,
    BlogTagComponent,
    BlogCommentsComponent
  ],
  imports: [CommonModule, BlogRoutingModule, ScullyLibModule, SharedModule],

})
export class BlogModule { }
