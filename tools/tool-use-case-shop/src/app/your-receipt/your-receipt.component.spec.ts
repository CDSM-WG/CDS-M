import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourReceiptComponent } from './your-receipt.component';

describe('YourReceiptComponent', () => {
  let component: YourReceiptComponent;
  let fixture: ComponentFixture<YourReceiptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YourReceiptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YourReceiptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
