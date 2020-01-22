import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowtoregisterpageComponent } from './howtoregisterpage.component';

describe('HowtoregisterpageComponent', () => {
  let component: HowtoregisterpageComponent;
  let fixture: ComponentFixture<HowtoregisterpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HowtoregisterpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HowtoregisterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
