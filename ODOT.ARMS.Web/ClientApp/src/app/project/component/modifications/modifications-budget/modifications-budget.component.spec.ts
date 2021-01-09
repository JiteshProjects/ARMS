import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificationsBudgetComponent } from './modifications-budget.component';

describe('ModificationsBudgetComponent', () => {
  let component: ModificationsBudgetComponent;
  let fixture: ComponentFixture<ModificationsBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificationsBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificationsBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
