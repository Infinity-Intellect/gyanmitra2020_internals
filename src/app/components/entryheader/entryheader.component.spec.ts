import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryheaderComponent } from './entryheader.component';

describe('EntryheaderComponent', () => {
  let component: EntryheaderComponent;
  let fixture: ComponentFixture<EntryheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
