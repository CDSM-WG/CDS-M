import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardStoreComponent } from './standard-store.component';

describe('StandardStoreComponent', () => {
  let component: StandardStoreComponent;
  let fixture: ComponentFixture<StandardStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardStoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
