import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackTicketComponent } from './black-ticket.component';

describe('BlackTicketComponent', () => {
  let component: BlackTicketComponent;
  let fixture: ComponentFixture<BlackTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlackTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
