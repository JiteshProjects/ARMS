import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialBudgetFringebenefitsComponent } from './financial-budget-fringebenefits.component';

describe('FinancialBudgetFringebenefitsComponent', () => {
  let component: FinancialBudgetFringebenefitsComponent;
  let fixture: ComponentFixture<FinancialBudgetFringebenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialBudgetFringebenefitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialBudgetFringebenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
