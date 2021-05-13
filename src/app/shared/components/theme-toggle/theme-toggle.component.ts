import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {

  @Input() positionClass: string;
  @HostBinding('class') get themeToggleClasses() {
    return (
      'w-10 h-10 lg:flex lg:items-center lg:justify-center cursor-pointer' +
      ' ' +
      this.positionClass
    );
  }
  @HostBinding('attr.aria-label') ariaLabel = 'Dark and Light mode toggle button';
  @HostListener('click')
  onClick() {
    this.themeService.update();
    this.current = this.themeService.scheme;
  }

  current = this.themeService.scheme;

  constructor(
    private readonly themeService: ThemeService
  ) { }

  ngOnInit(): void {
  }

}
