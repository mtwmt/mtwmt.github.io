import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IronmanComponent } from './ironman.component';

const routes: Routes = [
  {
    path: '',
    component: IronmanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IronmanRoutingModule { }
