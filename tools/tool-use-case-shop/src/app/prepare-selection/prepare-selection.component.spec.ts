import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareSelectionComponent } from './prepare-selection.component';

describe('PrepareSelectionComponent', () => {
  let component: PrepareSelectionComponent;
  let fixture: ComponentFixture<PrepareSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
