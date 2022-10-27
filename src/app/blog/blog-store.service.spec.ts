import { TestBed } from '@angular/core/testing';

import { BlogStoreService } from './blog-store.service';

describe('BlogStoreService', () => {
  let service: BlogStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlogStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
