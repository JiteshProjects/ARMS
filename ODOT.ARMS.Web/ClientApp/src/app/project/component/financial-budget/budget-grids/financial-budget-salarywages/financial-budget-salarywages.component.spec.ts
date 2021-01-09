import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBudgetSalarywagesComponent } from './financial-budget-salarywages.component';

describe('FinancialBudgetSalarywagesComponent', () => {
  let component: FinancialBudgetSalarywagesComponent;
  let fixture: ComponentFixture<FinancialBudgetSalarywagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialBudgetSalarywagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialBudgetSalarywagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
