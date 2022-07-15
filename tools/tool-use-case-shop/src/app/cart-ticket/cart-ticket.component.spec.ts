import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTicketComponent } from './cart-ticket.component';

describe('CartTicketComponent', () => {
  let component: CartTicketComponent;
  let fixture: ComponentFixture<CartTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
