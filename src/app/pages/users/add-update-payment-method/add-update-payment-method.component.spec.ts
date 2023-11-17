import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdatePaymentMethodComponent } from './add-update-payment-method.component';

describe('AddUpdatePaymentMethodComponent', () => {
  let component: AddUpdatePaymentMethodComponent;
  let fixture: ComponentFixture<AddUpdatePaymentMethodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdatePaymentMethodComponent]
    });
    fixture = TestBed.createComponent(AddUpdatePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
