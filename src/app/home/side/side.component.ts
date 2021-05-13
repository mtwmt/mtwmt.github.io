import { Component, OnInit } from '@angular/core';
import { BlogListService } from 'src/app/blog-list/blog-list.service';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss']
})
export class SideComponent implements OnInit {

  constructor(
    public blogListService: BlogListService
  ) { }

  ngOnInit(): void {
  }

}
