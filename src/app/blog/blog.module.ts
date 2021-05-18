import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogNavComponent } from './blog-nav/blog-nav.component';
import { SharedModule } from '../shared/shared.module';
import { BlogDonateComponent } from './blog-donate/blog-donate.component';
import { BlogTagComponent } from './blog-tag/blog-tag.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { BlogListModule } from '../blog-list/blog-list.module';

@NgModule({
  declarations: [
    BlogComponent,
    BlogNavComponent,
    BlogDonateComponent,
    BlogTagComponent,
    BlogCommentsComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    BlogListModule,
    ScullyLibModule,
    SharedModule,
  ],
})
export class BlogModule {}
