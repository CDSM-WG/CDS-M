import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseTicketComponent } from './use-case-ticket.component';

describe('UseCaseTicketComponent', () => {
  let component: UseCaseTicketComponent;
  let fixture: ComponentFixture<UseCaseTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCaseTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
