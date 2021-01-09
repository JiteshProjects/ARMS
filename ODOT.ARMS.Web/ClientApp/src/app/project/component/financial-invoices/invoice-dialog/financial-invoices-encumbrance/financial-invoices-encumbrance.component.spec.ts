import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInvoicesEncumbranceComponent } from './financial-invoices-encumbrance.component';

describe('FinancialInvoicesEncumbranceComponent', () => {
  let component: FinancialInvoicesEncumbranceComponent;
  let fixture: ComponentFixture<FinancialInvoicesEncumbranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInvoicesEncumbranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInvoicesEncumbranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
