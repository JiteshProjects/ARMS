import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialFundingComponent } from './financial-funding.component';

describe('FinancialFundingComponent', () => {
  let component: FinancialFundingComponent;
  let fixture: ComponentFixture<FinancialFundingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialFundingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
