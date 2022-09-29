import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStandardComponent } from './config-standard.component';

describe('ConfigStandardComponent', () => {
  let component: ConfigStandardComponent;
  let fixture: ComponentFixture<ConfigStandardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigStandardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
