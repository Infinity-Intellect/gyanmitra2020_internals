import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiondialogComponent } from './descriptiondialog.component';

describe('DescriptiondialogComponent', () => {
  let component: DescriptiondialogComponent;
  let fixture: ComponentFixture<DescriptiondialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescriptiondialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
