import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewteamdialogComponent } from './viewteamdialog.component';

describe('ViewteamdialogComponent', () => {
  let component: ViewteamdialogComponent;
  let fixture: ComponentFixture<ViewteamdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewteamdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewteamdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
