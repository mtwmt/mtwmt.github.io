import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isOpen = false;
  constructor(private renderer: Renderer2, public blogService: BlogService) {}

  ngOnInit(): void {}

  public toggle(): void {
    this.isOpen = !this.isOpen;
  }
}
