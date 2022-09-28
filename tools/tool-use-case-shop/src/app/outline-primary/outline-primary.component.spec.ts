import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutlinePrimaryComponent } from './outline-primary.component';

describe('OutlinePrimaryComponent', () => {
  let component: OutlinePrimaryComponent;
  let fixture: ComponentFixture<OutlinePrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutlinePrimaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutlinePrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
