import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isOpen = false;
  constructor() {}

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
