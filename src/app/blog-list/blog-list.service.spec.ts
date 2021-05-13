import { TestBed } from '@angular/core/testing';

import { BlogListService } from './blog-list.service';

describe('BlogListService', () => {
  let service: BlogListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
