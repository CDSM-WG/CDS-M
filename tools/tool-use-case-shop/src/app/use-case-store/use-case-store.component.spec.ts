import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseStoreComponent } from './use-case-store.component';

describe('UseCaseStoreComponent', () => {
  let component: UseCaseStoreComponent;
  let fixture: ComponentFixture<UseCaseStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCaseStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
