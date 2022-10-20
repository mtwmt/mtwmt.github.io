import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent implements OnInit {

  theme!: boolean;

  constructor(
    private appService: AppService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.appService.theme$.subscribe((theme: string) => {
      this.onChange(theme === 'dark');
      this.theme = theme === 'dark';

      console.log('theme', theme);
    });
  }

  onChange(isChecked: any) {
    console.log('isChecked', isChecked);
    if (isChecked) {
      this.renderer.addClass(this.document.body, 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
      localStorage.removeItem('theme');
    }
  }
}
