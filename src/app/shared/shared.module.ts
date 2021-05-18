import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetaComponent } from './components/meta/meta.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GotopComponent } from './components/gotop/gotop.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    MetaComponent,
    ModalComponent,
    BreadcrumbComponent,
    GotopComponent,
  ],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [
    ReactiveFormsModule,
    ThemeToggleComponent,
    MetaComponent,
    ModalComponent,
    BreadcrumbComponent,
    FontAwesomeModule,
    GotopComponent,
  ],
})
export class SharedModule {}
