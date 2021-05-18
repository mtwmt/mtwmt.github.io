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
    readonly themeService: ThemeService
  ) {
    themeService.load();
  }

  ngOnInit(): void {}

  public toggle(event?: any, block = false): void {
    this.isOpen = !this.isOpen;
    if (block) {
      event.preventDefault();
    }
  }

  public setNavigate(): void {
    scroll(0, 0);
    this.toggle();
  }
}
