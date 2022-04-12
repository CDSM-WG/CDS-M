import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExImportButtonComponent } from './ex-import-button.component';

describe('ExImportButtonComponent', () => {
  let component: ExImportButtonComponent;
  let fixture: ComponentFixture<ExImportButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExImportButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExImportButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
