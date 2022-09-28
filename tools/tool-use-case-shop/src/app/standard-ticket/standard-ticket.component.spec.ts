import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardTicketComponent } from './standard-ticket.component';

describe('StandardTicketComponent', () => {
  let component: StandardTicketComponent;
  let fixture: ComponentFixture<StandardTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
