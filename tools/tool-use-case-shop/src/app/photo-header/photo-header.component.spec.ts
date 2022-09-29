import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoHeaderComponent } from './photo-header.component';

describe('MainTitleComponent', () => {
  let component: PhotoHeaderComponent;
  let fixture: ComponentFixture<PhotoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
