import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogListService } from '../blog-list/blog-list.service';
import { MetaService } from '../shared/services/meta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;

  foods = [
    { value: 'steak-0', label: 'Steak' },
    { value: 'pizza-1', label: 'Pizza' },
    { value: 'tacos-2', label: 'Tacos' }
  ];

  constructor(
    private readonly metaService: MetaService,
    public blogListService: BlogListService
  ) { 

    
  }

  ngOnInit(): void {

    
    // this.blogListService.blogAllList$.subscribe(res => {
    //   console.log('we', res)
    // })
  }

  // onSubmit() {
  //   console.log('onSubmit', this.form)
    
  // }
}
