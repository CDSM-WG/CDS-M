import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseCaseTileComponent } from './use-case-tile.component';

describe('UseCaseTileComponent', () => {
  let component: UseCaseTileComponent;
  let fixture: ComponentFixture<UseCaseTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseCaseTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseCaseTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
