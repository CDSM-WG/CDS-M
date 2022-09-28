import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaBlockComponent } from './cta-block.component';

describe('FirstSelectionComponent', () => {
  let component: CtaBlockComponent;
  let fixture: ComponentFixture<CtaBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CtaBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CtaBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
