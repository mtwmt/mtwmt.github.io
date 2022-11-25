import { Platform } from '@angular/cdk/platform';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppService } from './app.service';
import { MetaService } from './shared/services/meta.service';
import { PlatformService } from './shared/services/platform.service';

declare let gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOpen = false;
  constructor(
    private router: Router,
    private platformService: PlatformService,
    private metaService: MetaService,
    public appService: AppService,
    private platform: Platform
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

  ngOnInit(): void {
    this.appService.toggleHamburger$.subscribe((isOpen) => {
      this.isOpen = isOpen;
    });
    this.initTheme();
  }

  initTheme(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    const theme = localStorage.getItem('theme') || '';
    this.onThemeChange(theme);
  }

  onThemeChange(theme: string = ''): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.appService.theme$.next(theme);
  }

  public toggle(): void {
    this.isOpen = !this.isOpen;
    this.appService.toggleHamburger$.next(this.isOpen);
  }
}
