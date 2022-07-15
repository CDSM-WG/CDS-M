import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseViewComponent } from './use-case-view.component';

describe('UseCaseViewComponent', () => {
  let component: UseCaseViewComponent;
  let fixture: ComponentFixture<UseCaseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCaseViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
