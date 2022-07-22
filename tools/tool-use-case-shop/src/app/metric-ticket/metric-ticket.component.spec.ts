import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricTicketComponent } from './metric-ticket.component';

describe('MetricTicketComponent', () => {
  let component: MetricTicketComponent;
  let fixture: ComponentFixture<MetricTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
