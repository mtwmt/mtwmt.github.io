import { ChangeDetectorRef, Component, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isOpen = false;

  constructor(
    private readonly renderer: Renderer2,
    readonly themeService: ThemeService,
  ) {
    themeService.load();
  }

  ngOnInit(): void {

  }

  public setOpen(isBoolean: boolean): void {
    if (isBoolean) {
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }

}
