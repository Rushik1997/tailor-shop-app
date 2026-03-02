import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceNewOrder } from './place-new-order';

describe('PlaceNewOrder', () => {
  let component: PlaceNewOrder;
  let fixture: ComponentFixture<PlaceNewOrder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceNewOrder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaceNewOrder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
