import { TestBed } from '@angular/core/testing';

import { LoginpageService } from './loginpage.service';

describe('LoginpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginpageService = TestBed.get(LoginpageService);
    expect(service).toBeTruthy();
  });
});
