import { path } from '@angular-devkit/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostsResolver } from './blog-posts/blog-posts.resolver';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: 'list',
        component: BlogListComponent,
      },
      {
        path: ':directory/:slug',
        component: BlogPostsComponent,
        resolve: { content: BlogPostsResolver },
      },
      {
        path: '**',
        component: BlogListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule {}
