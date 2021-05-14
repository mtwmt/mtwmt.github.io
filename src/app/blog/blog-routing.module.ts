import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogListCategoriesComponent } from '../blog-list/blog-list-categories/blog-list-categories.component';
import { BlogListComponent } from '../blog-list/blog-list.component';

import { BlogComponent } from './blog.component';

const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: ':slug',
    component: BlogComponent,
    data: {
      breadcrumb: 'categories'
    }
  },
  {
    path: '**',
    component: BlogComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogRoutingModule { }

