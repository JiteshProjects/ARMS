import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInvoicesBudgetCategoriesComponent } from './financial-invoices-budget-categories.component';

describe('FinancialInvoicesBudgetCategoriesComponent', () => {
  let component: FinancialInvoicesBudgetCategoriesComponent;
  let fixture: ComponentFixture<FinancialInvoicesBudgetCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInvoicesBudgetCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInvoicesBudgetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
