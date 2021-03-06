import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FinancialBudgetComponent } from '../../financial-budget.component';
import { BudgetService } from 'src/app/project/services/budget.service';
import { Subscription } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-financial-budget-subcontractor',
  templateUrl: './financial-budget-subcontractor.component.html',
  styles: [
  ],
})
export class FinancialBudgetSubcontractorComponent implements OnInit, OnDestroy {
  sub: Subscription;
  @Input() parent: FinancialBudgetComponent;
  editDialogOpened: boolean;
  phaseItems: string[];
  budgetCategoryData: { 'BudgetId': string, 'BcAltId': number, 'Phase': string; 'Title': string; 'PreliminaryAmount'?: string; 'Amount': number; 'Status': string; }[] = [];
  constructor(public budgetService: BudgetService, private fb: FormBuilder) { }
  public gridBudgetCategoryData: any[];
  ngOnInit(): void {
    this.parent.oneForAllEditBudgetDialogForm = this.fb.group({
      title: ['', Validators.required],
      phase: [''],
      bcAltId: [''],
      budgetId: [''],
      amount: [''],
    });
    this.parent.otherGridData.forEach(item => {
      this.budgetCategoryData.push({
        Title: item.budgetTitle,
        Phase: 'Phase 1',
        Status: 'Active',
        Amount: item.amount,
        BudgetId: item.budgetId,
        BcAltId: item.bcAltId
      })
    });
    this.sub = this.budgetService._budget.subscribe(budget => {
      console.log('bs service subc', budget, this.parent.currentBcAltId);
      if (budget && this.parent.currentBcAltId == budget.bcAltId) {
        if (this.budgetService.isAdd && !this.parent.otherGridData.some(x => x.budgetId == budget.budgetId)) {
          this.budgetCategoryData.push({
            Title: budget.budgetTitle,
            Phase: 'Phase 1',
            Status: 'Active',
            BcAltId: budget.bcAltId,
            BudgetId: budget.budgetId,
            Amount: budget.amount,
          });
        }
        else {
          console.log('edit block subc');
          const index = this.budgetCategoryData.findIndex(x => x.BudgetId == budget.budgetId);
          if (index !== -1) {
            this.budgetCategoryData[index] = {
              BudgetId: budget.budgetId,
              Title: budget.budgetTitle,
              Phase: 'Phase 1',
              Status: 'Active',
              BcAltId: budget.bcAltId,
              Amount: budget.amount,
            }
          }
        }
        this.gridBudgetCategoryData = this.budgetCategoryData.slice();
      }
    });
    this.gridBudgetCategoryData = this.budgetCategoryData.slice();
  }

  public onEditClick(rowData) {
    this.editDialogOpened = true;
    this.parent.oneForAllEditBudgetDialogForm.patchValue({
      budgetId: String(Object(rowData)['BudgetId']),
      bcAltId: String(Object(rowData)['BcAltId']),
      title: String(Object(rowData)['Title']),
      phase: { text: String(Object(rowData)['Phase']), value: this.parent.phases.find(x => x.text.toLowerCase() == String(Object(rowData)['Phase']).toLowerCase()).value },
      amount: Number(Object(rowData)['Amount'])
    });
  }

  public editDialogClose() {
    this.editDialogOpened = false;
  }

  submitForm() {
    this.parent.submitEditBudgetForm();
    this.editDialogOpened = false;
  }
  ngOnDestroy() {
    console.log('ng destroy subcontractor');
    this.sub.unsubscribe();
  }

}
