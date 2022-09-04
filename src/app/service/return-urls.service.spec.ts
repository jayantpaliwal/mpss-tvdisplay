import { TestBed } from '@angular/core/testing';

import { ReturnUrlsService } from './return-urls.service';

describe('ReturnUrlsService', () => {
  let service: ReturnUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReturnUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
