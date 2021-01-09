import { Component, OnInit, Input, OnDestroy, OnChanges } from '@angular/core';
import { FinancialBudgetComponent } from '../../financial-budget.component';
import { BudgetService } from 'src/app/project/services/budget.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-financial-budget-fringebenefits',
  templateUrl: './financial-budget-fringebenefits.component.html',
  styles: [
  ],
})
export class FinancialBudgetFringebenefitsComponent implements OnInit, OnDestroy {
  @Input() parent: FinancialBudgetComponent;
  private sub: Subscription;
  editDialogOpened: boolean;
  phaseItems: string[];
  budgetCategoryData: { 'BudgetId': string, 'BcAltId': number, 'Phase': string; 'Title': string; 'ODOTFunding': number; 'OrgCostSharing': number; 'Status': string; 'Quantity'?: undefined; }[] = [];
  constructor(private budgetService: BudgetService, private fb: FormBuilder) { }
  public gridBudgetCategoryData: any[];
  ngOnInit(): void {
    this.parent.oneForAllEditBudgetDialogForm = this.fb.group({
      title: ['', Validators.required],
      phase: [''],
      odotFunding: [''],
      orgCostSharing: [''],
      status: [''],
      bcAltId: [''],
      budgetId: ['']
    });
    console.log('checking data', this.parent.otherGridData);
    this.parent.otherGridData?.forEach(item => {
      this.budgetCategoryData.push({
        ODOTFunding: item.odotFunding,
        OrgCostSharing: item.orgCostSharing,
        Title: item.budgetTitle,
        Phase: 'Phase 1',
        Status: 'Active',
        BcAltId: item.bcAltId,
        BudgetId: item.budgetId
      })
    })
    console.log('how many times here');
    this.sub = this.budgetService._budget.subscribe(budget => {
      console.log('bs service', budget, this.parent.currentBcAltId);
      if (budget && this.parent.currentBcAltId == budget.bcAltId) {
        if (this.budgetService.isAdd && !this.parent.otherGridData.some(x => x.budgetId == budget.budgetId)) {
          this.budgetCategoryData.push({
            ODOTFunding: budget.odotFunding,
            OrgCostSharing: budget.orgCostSharing,
            Title: budget.budgetTitle,
            Phase: 'Phase 1',
            Status: 'Active',
            BcAltId: budget.bcAltId,
            BudgetId: budget.budgetId
          });
        }
        else {
          console.log('edit block');
          const index = this.budgetCategoryData.findIndex(x => x.BudgetId == budget.budgetId);
          if (index !== -1) {
            this.budgetCategoryData[index] = {
              BudgetId: budget.budgetId,
              ODOTFunding: budget.odotFunding,
              OrgCostSharing: budget.orgCostSharing,
              Title: budget.budgetTitle,
              Phase: 'Phase 1',
              Status: 'Active',
              BcAltId: budget.bcAltId
            }
          }
        }
        this.gridBudgetCategoryData = this.budgetCategoryData.slice();
      }
    });
    this.phaseItems = ["Phase 1", "Phase 2", "Phase 3"];
    this.gridBudgetCategoryData = this.budgetCategoryData.slice();
  }
  public editDialogClose() {
    this.editDialogOpened = false;
  }
  public onEditClick(rowData) {
    this.editDialogOpened = true;
    this.parent.oneForAllEditBudgetDialogForm.patchValue({
      budgetId: String(Object(rowData)['BudgetId']),
      bcAltId: String(Object(rowData)['BcAltId']),
      title: String(Object(rowData)['Title']),
      phase: { text: String(Object(rowData)['Phase']), value: this.parent.phases.find(x => x.text.toLowerCase() == String(Object(rowData)['Phase']).toLowerCase()).value },
      odotFunding: Number(Object(rowData)['ODOTFunding']),
      orgCostSharing: Number(Object(rowData)['OrgCostSharing']),
      status: { text: String(Object(rowData)['Status']), value: this.parent.status.find(x => x.text.toLowerCase() == String(Object(rowData)['Status']).toLowerCase()).value },
    });

  }

  submitForm() {
    this.parent.submitEditBudgetForm();
    this.editDialogOpened = false;
  }

  ngOnDestroy() {
    console.log('ng destroy fb');
    this.sub.unsubscribe();
  }
}
