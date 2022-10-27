import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GotopComponent } from './components/gotop/gotop.component';
import { SwitchComponent } from './components/switch/switch.component';
import { FriendshipLinkComponent } from './components/friendship-link/friendship-link.component';
import { HighlightPipe } from './pipe/highlight.pipe';

@NgModule({
  declarations: [
    PaginationComponent,
    GotopComponent,
    SwitchComponent,
    FriendshipLinkComponent,
    HighlightPipe,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PaginationComponent,
    GotopComponent,
    SwitchComponent,
    FriendshipLinkComponent,
    HighlightPipe,
  ],
})
export class SharedModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas as any, far as any, fab as any);
  }
}
