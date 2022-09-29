import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkSecondaryComponent } from './link-secondary.component';

describe('LinkSecondaryComponent', () => {
  let component: LinkSecondaryComponent;
  let fixture: ComponentFixture<LinkSecondaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkSecondaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
