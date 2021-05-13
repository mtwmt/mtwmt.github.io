import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListCategoriesComponent } from './blog-list-categories/blog-list-categories.component';
import { BlogListPaginationComponent } from './blog-list-pagination/blog-list-pagination.component';
import { BlogListTagComponent } from './blog-list-tag/blog-list-tag.component';
import { BlogListComponent } from './blog-list.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: BlogListComponent,
  },
  {
    path: '**',
    component: BlogListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogListRoutingModule { }

@NgModule({
  declarations: [
    BlogListComponent,
    BlogListPaginationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BlogListRoutingModule,
  ]
})
export class BlogListModule { }

