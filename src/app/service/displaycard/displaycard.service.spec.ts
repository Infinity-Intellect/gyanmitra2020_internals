import { TestBed } from '@angular/core/testing';

import { DisplaycardService } from './displaycard.service';

describe('DisplaycardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplaycardService = TestBed.get(DisplaycardService);
    expect(service).toBeTruthy();
  });
});
