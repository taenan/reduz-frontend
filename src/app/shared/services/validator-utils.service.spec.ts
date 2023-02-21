import { TestBed } from '@angular/core/testing';

import { ValidatorUtilsService } from './validator-utils.service';

describe('ValidatorUtilsService', () => {
  let service: ValidatorUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
