import { TestBed } from '@angular/core/testing';

import { ThreadsService } from './threads.service';

describe('ThreadService', () => {
  let service: ThreadsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
