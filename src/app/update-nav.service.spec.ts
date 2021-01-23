import { TestBed } from '@angular/core/testing';

import { UpdateNavService } from './update-nav.service';

describe('UpdateNavService', () => {
  let service: UpdateNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
