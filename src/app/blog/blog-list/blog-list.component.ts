import { ListInfo } from './../blog.service';
import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
})
export class BlogListComponent implements OnInit {

  public page$: Observable<ListInfo[]> = this.blogService.fetchBlogList()


  constructor(private blogService: BlogService) {}

  ngOnInit(): void {
    // this.blogService.fetchBlogList().subscribe((res) => {
    //   console.log('asdasd', res);
    // });
  }
}
