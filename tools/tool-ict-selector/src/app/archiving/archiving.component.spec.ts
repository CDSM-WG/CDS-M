import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivingComponent } from './archiving.component';

describe('ArchivingComponent', () => {
  let component: ArchivingComponent;
  let fixture: ComponentFixture<ArchivingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
