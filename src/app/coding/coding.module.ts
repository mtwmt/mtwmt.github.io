import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormGroupComponent } from './form/form-group/form-group.component';
import { FormControlComponent } from './form/form-control/form-control.component';
import { CodingRoutingModule } from './coding-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DefaultFormControlComponent } from './form/default-form-control/default-form-control.component';



@NgModule({
  declarations: [FormComponent, FormGroupComponent, FormControlComponent, DefaultFormControlComponent],
  imports: [CommonModule, CodingRoutingModule, SharedModule],
})
export class CodingModule {}
