import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageteamdialogComponent } from './manageteamdialog.component';

describe('ManageteamdialogComponent', () => {
  let component: ManageteamdialogComponent;
  let fixture: ComponentFixture<ManageteamdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageteamdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageteamdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
