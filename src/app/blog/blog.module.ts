import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostsCommentsComponent } from './blog-posts-comments/blog-posts-comments.component';
import { BlogPostsTocComponent } from './blog-posts-toc/blog-posts-toc.component';
import { SharedModule } from '../shared/shared.module';
import { BlogSideCategoriesComponent } from './blog-side-categories/blog-side-categories.component';
import { BlogCategoriesListComponent } from './blog-categories-list/blog-categories-list.component';
import { BlogSideTagsComponent } from './blog-side-tags/blog-side-tags.component';
import { BlogTagsListComponent } from './blog-tags-list/blog-tags-list.component';
import { BlogSideLinkComponent } from './blog-side-link/blog-side-link.component';

@NgModule({
  declarations: [
    BlogComponent,
    BlogListComponent,
    BlogPostsComponent,
    BlogPostsCommentsComponent,
    BlogPostsTocComponent,
    BlogSideCategoriesComponent,
    BlogCategoriesListComponent,
    BlogSideTagsComponent,
    BlogTagsListComponent,
    BlogSideLinkComponent,
  ],
  imports: [CommonModule, BlogRoutingModule, SharedModule],
})
export class BlogModule {}
