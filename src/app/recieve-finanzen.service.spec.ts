import { TestBed } from '@angular/core/testing';

import { RecieveFinanzenService } from './recieve-finanzen.service';

describe('RecieveFinanzenService', () => {
  let service: RecieveFinanzenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecieveFinanzenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
