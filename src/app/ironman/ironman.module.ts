import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IronmanRoutingModule } from './ironman-routing.module';
import { IronmanComponent } from './ironman.component';


@NgModule({
  declarations: [
    IronmanComponent
  ],
  imports: [
    CommonModule,
    IronmanRoutingModule
  ]
})
export class IronmanModule { }
