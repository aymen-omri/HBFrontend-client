import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BecomeConsultantComponent } from './become-consultant.component';

describe('BecomeConsultantComponent', () => {
  let component: BecomeConsultantComponent;
  let fixture: ComponentFixture<BecomeConsultantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BecomeConsultantComponent]
    });
    fixture = TestBed.createComponent(BecomeConsultantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
