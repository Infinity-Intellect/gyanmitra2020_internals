import { TestBed } from '@angular/core/testing';

import { ManageteamdialogService } from './manageteamdialog.service';

describe('ManageteamdialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageteamdialogService = TestBed.get(ManageteamdialogService);
    expect(service).toBeTruthy();
  });
});
