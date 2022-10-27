import { Component, HostBinding, OnInit, Renderer2 } from '@angular/core';
import { AppService } from '../app.service';
import { BlogService } from '../blog/blog.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    public appService: AppService,
    public blogService: BlogService
  ) {}

  ngOnInit(): void {}

  public onClose(): void {
    this.appService.toggleHamburger$.next(false);
  }
}
