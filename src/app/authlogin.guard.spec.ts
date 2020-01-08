import { TestBed, async, inject } from '@angular/core/testing';

import { AuthloginGuard } from './authlogin.guard';

describe('AuthloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthloginGuard]
    });
  });

  it('should ...', inject([AuthloginGuard], (guard: AuthloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
