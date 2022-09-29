import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrepareStandardTicketComponent } from './prepare-standard-ticket.component';

describe('PrepareStandardTicketComponent', () => {
  let component: PrepareStandardTicketComponent;
  let fixture: ComponentFixture<PrepareStandardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrepareStandardTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareStandardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
