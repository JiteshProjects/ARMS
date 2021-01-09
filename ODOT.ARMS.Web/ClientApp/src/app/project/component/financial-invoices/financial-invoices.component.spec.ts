import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialInvoicesComponent } from './financial-invoices.component';

describe('FinancialInvoicesComponent', () => {
  let component: FinancialInvoicesComponent;
  let fixture: ComponentFixture<FinancialInvoicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialInvoicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
