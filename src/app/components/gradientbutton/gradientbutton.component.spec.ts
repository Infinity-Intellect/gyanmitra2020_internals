import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientbuttonComponent } from './gradientbutton.component';

describe('GradientbuttonComponent', () => {
  let component: GradientbuttonComponent;
  let fixture: ComponentFixture<GradientbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradientbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradientbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
