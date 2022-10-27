import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { pluck, map, tap, concatMap, Observable, switchMap } from 'rxjs';
import { ListInfo, BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss'],
})
export class BlogLayoutComponent implements OnInit {



  constructor(
  ) {}

  ngOnInit(): void {
  }


}
