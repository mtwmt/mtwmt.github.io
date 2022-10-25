import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HomeComponent } from '../home/home.component';
import { IronmanComponent } from '../ironman/ironman.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { SharedModule } from '../shared/shared.module';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { BlogModule } from '../blog/blog.module';

@NgModule({
  declarations: [
    LayoutComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    NotfoundComponent,
    IronmanComponent,
    PortfolioComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, SharedModule, BlogModule],
})
export class LayoutModule {}
