import { Component, OnInit } from '@angular/core';
import { shareReplay } from 'rxjs';
import { BlogService } from './blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  constructor(private blogService: BlogService) {}

  ngOnInit(): void {}
}
