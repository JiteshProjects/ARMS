import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBudgetSubcontractorComponent } from './financial-budget-subcontractor.component';

describe('FinancialBudgetSubcontractorComponent', () => {
  let component: FinancialBudgetSubcontractorComponent;
  let fixture: ComponentFixture<FinancialBudgetSubcontractorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialBudgetSubcontractorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialBudgetSubcontractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
