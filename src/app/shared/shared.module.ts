import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaComponent } from './components/meta/meta.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [ThemeToggleComponent, MetaComponent, ModalComponent, BreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  exports: [ThemeToggleComponent, MetaComponent, ModalComponent, BreadcrumbComponent],
})
export class SharedModule { }
