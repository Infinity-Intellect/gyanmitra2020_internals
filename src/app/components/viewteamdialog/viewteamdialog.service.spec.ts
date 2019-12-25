import { TestBed } from '@angular/core/testing';

import { ViewteamdialogService } from './viewteamdialog.service';

describe('ViewteamdialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewteamdialogService = TestBed.get(ViewteamdialogService);
    expect(service).toBeTruthy();
  });
});
