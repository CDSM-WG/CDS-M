import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseDetailComponent } from './use-case-detail.component';

describe('UseCaseDetailComponent', () => {
  let component: UseCaseDetailComponent;
  let fixture: ComponentFixture<UseCaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCaseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
