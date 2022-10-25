import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isOpen = false;
  constructor(public blogService: BlogService) {
    this.blogService.getBlogLayout$.subscribe((res) => console.log(res));
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
