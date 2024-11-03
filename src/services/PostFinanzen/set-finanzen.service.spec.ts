import { TestBed } from '@angular/core/testing';

import { SetFinanzenService } from './set-finanzen.service';

describe('SetFinanzenService', () => {
  let service: SetFinanzenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetFinanzenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
