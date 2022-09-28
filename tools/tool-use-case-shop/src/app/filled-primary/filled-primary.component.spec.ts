import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilledPrimaryComponent } from './filled-primary.component';

describe('FilledPrimaryComponent', () => {
  let component: FilledPrimaryComponent;
  let fixture: ComponentFixture<FilledPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilledPrimaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilledPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
