import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAuthenticationComponent } from './config-authentication.component';

describe('ConfigAuthenticationComponent', () => {
  let component: ConfigAuthenticationComponent;
  let fixture: ComponentFixture<ConfigAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
