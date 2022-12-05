import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotfoundComponent } from '../notfound/notfound.component';
import { BlogCategoriesListComponent } from './blog-categories-list/blog-categories-list.component';
import { BlogLayoutListComponent } from './blog-layout-list/blog-layout-list.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostsResolver } from './blog-posts/blog-posts.resolver';
import { BlogSearchListComponent } from './blog-search-list/blog-search-list.component';
import { BlogTagsListComponent } from './blog-tags-list/blog-tags-list.component';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: BlogListComponent,
      },
      {
        path: 'layout/:layout',
        component: BlogLayoutListComponent,
      },
      {
        path: 'categories/:category',
        component: BlogCategoriesListComponent,
      },
      {
        path: 'tags/:tag',
        component: BlogTagsListComponent,
      },

      {
        path: 'search',
        component: BlogSearchListComponent,
      },
    ],
  },
  {
    path: ':directory/:slug',
    component: BlogPostsComponent,
    resolve: { content: BlogPostsResolver },
  },
  {
    path: '**',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
