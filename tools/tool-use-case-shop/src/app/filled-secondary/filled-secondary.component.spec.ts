import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledSecondaryComponent } from './filled-secondary.component';

describe('FilledSecondaryComponent', () => {
  let component: FilledSecondaryComponent;
  let fixture: ComponentFixture<FilledSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilledSecondaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilledSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
