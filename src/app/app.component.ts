import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MetaService } from './shared/services/meta.service';
import { PlatformService } from './shared/services/platform.service';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private platformService: PlatformService,
    private metaService: MetaService
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((url) => {
        this.metaService.updateMeta({
          title: '',
          description: '學習紀錄',
          keywords: [],
          type: 'website',
        });
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (!this.platformService.isServer && environment.production) {
          gtag('event', 'page_view', { page_path: event.url });
        }
      });
  }
}
