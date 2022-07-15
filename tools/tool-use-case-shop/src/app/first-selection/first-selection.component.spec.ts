import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstSelectionComponent } from './first-selection.component';

describe('FirstSelectionComponent', () => {
  let component: FirstSelectionComponent;
  let fixture: ComponentFixture<FirstSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
