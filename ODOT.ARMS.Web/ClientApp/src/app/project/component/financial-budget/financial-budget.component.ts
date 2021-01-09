import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromAdministration from '../../../manage/state/reducers';
import * as fromBudget from '../../state/reducers/budget.reducers';
import * as fromBudgetCategory from '../../state/reducers/budgetCategory.reducer';
import * as fromBudgetActions from '../../state/actions/budget.actions';
import * as fromProjectReducer from '../../state/reducers/project.reducer';
import * as specificlistActions from '../../../manage/state/actions/specificlist';
import * as fromAdministrationReducer from '../../../manage/state/reducers/administration-categories';
import * as administrationActions from '../../../manage/state/actions/administration-categories';
import { GenericLookupListForDD } from '../../services/project-for-update';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Budget } from '../../models/budget';
import { kendonotificationservice } from 'src/app/shared/services/kendo-notification.service';
import { GroupDescriptor, process, DataResult } from '@progress/kendo-data-query';
import { ProjectService } from '../../services/project.service';
import { BudgetService } from '../../services/budget.service';
import { Update } from '@ngrx/entity';
export enum BudgetDialogCategories {
  salariesandwages = 'Salaries and Wages',
  subcontractor = 'SubContractor'
}

@Component({
  selector: 'app-financial-budget',
  templateUrl: './financial-budget.component.html',
  styleUrls: ['./financial-budget.component.scss']
})
export class FinancialBudgetComponent implements OnInit {
  //public activeTabText: string = "Budget";
  public budget: Budget;
  public oneForAllBudgetForm: FormGroup;
  public oneForAllEditBudgetDialogForm: FormGroup;
  public budgetDefault: GenericLookupListForDD = { text: 'Select Category', value: null };
  public budgetDataData: { 'BudgetCategory': string; 'BudgetAmount': number; 'BcAltId': number }[] = [];
  public selectedBudget: GenericLookupListForDD;
  public openSalaryWagesDialog: boolean;
  public openSubContractorDialog: boolean;
  public openOtherCategoriesDialog: boolean = false;
  public isSalaryWages: boolean;
  public isSubContractor: boolean;
  public isOther: boolean;
  public phaseItems: GenericLookupListForDD[];
  constructor(public projectStore$: Store<fromProjectReducer.ProjectState>, public store$: Store<fromAdministration.State>, public budgetCategoryStore: Store<fromBudgetCategory.BudgetCategoryState>, public budgetStore: Store<fromBudget.BudgetState>, private notificationService: kendonotificationservice, private projectService: ProjectService, private budgetService: BudgetService, private changeDetector: ChangeDetectorRef) { }
  public gridBudgetData: any[];
  public AddEditDialogOpened: boolean;
  public phases: GenericLookupListForDD[] = [{ text: 'Phase 1', value: '3B6E58C3-95A3-4046-B730-014D30F31FE2' }]; // // TODO: need to fetch from API
  public status: GenericLookupListForDD[] = [{ text: 'Active', value: '1' }]; // // TODO: need to fetch from API
  public groups = [{ field: 'Phase' }];
  public allBudgets: Budget[] = [];
  public otherGridData: Budget[];
  private prjId: string;
  public currentBcAltId: number;
  ngOnInit() {
    this.store$.dispatch(new specificlistActions.Load());
    this.store$.dispatch(administrationActions.loadadministrationCategories());
    this.budgetCategoryStore.dispatch(fromBudgetActions.loadBudgetCategories());
    this.projectService._data.subscribe(loadedProject => {
      this.prjId = loadedProject.projId;
    })
    this.budgetCategoryStore.pipe(select(fromBudgetCategory.getAllBudgetCatgeories)).subscribe(response => {

      console.log('response budget categories', response);

      this.store$.pipe(select(fromAdministration.getAllSpecificList)).subscribe(data => {
        let budgetCategory = data.find(x => x.specificListText.toLowerCase() == 'Budget Category'.toLowerCase());
        if (budgetCategory) {
          this.store$.pipe(select(fromAdministrationReducer.getAllAdministrationCategory)).subscribe(data => {
            this.phaseItems = data.filter(x => x.specificListID == budgetCategory.specificListID).map(item => {
              return { text: item.administrationCategoryText, value: item.administrationCategoryID }
            });
            if (this.phaseItems && response?.length > 0) {
              this.budgetDataData = [];
              response.forEach(item => {
                this.budgetDataData.push({ BudgetCategory: item.budgetCatText, BudgetAmount: item.budgetAmt, BcAltId: item.bcAltId });
              })
              this.gridBudgetData = this.budgetDataData.slice();
            }
          });

        }
      });
    });
    //this.budgetStore.dispatch(fromBudgetActions.loadBudgets());
    this.budgetStore.select(fromBudget.getAllBudgets).subscribe(response => {
      this.allBudgets = response;
      console.log('get all budgets fired', response);
    });
    this.budgetStore.select(fromBudget.courseFeatureSelector).subscribe(response => {
      console.log('hcecking subscriber add', response);
      if (response.addedBudget) {
        this.notificationService.showSuccess('Budget - ' + response.addedBudget.budgetTitle + ' created Successfully!');
        let budgetCategory = this.phaseItems.find(y => y.value == this.budget.budgetCategory.toString()).text;
        if (!this.budgetDataData.some(c => c.BudgetCategory.toLowerCase() == budgetCategory.toLowerCase())) {
          this.budgetDataData.push({
            BudgetAmount: this.budget.budgetAmount,
            BcAltId: response.addedBudget.bcAltId,
            BudgetCategory: budgetCategory
          });
          this.gridBudgetData = this.budgetDataData.slice();
        }
        console.log('add subscribe selector');
        this.budgetService.isAdd = true;
        this.budgetService.budgetAddOrEdit(response.addedBudget);
      }
      else if (response.editedBudget) {
        console.log('edit subscribe selector');
        this.notificationService.showSuccess('Budget - ' + response.editedBudget.budgetTitle + ' updated Successfully!');
        this.budgetService.isAdd = false;
        this.budgetService.budgetAddOrEdit(response.editedBudget);
      }
    });
    this.AddEditDialogOpened = false;
  }

  public handleBudgetCategoryChange(event: GenericLookupListForDD) {
    this.selectedBudget = event;
  }

  handlePhaseChange(event) {
    this.oneForAllBudgetForm.patchValue({
      phaseId: event.value,
      phaseTxt: event.text
    });
  }

  handleStatusChange(event) {
    this.oneForAllBudgetForm.patchValue({
      statusId: event.value,
      statusTxt: event.text
    });
  }

  submitEditBudgetForm() {
    let formData = this.oneForAllEditBudgetDialogForm.value;
    let editBudget = new Budget(undefined, undefined, formData.budgetId, formData.phase.value, formData.bcAltId, formData.budgetAmount, formData.title,
      formData.odotFunding, formData.orgCostSharing, new Date(), 'sai', 'A', formData.notes, formData.amount, formData.qty);
    console.log('edit data', editBudget);
    const budgetUpdate: Update<Budget> = {
      id: editBudget.budgetId,
      changes: {
        ...editBudget
      }
    };
    this.budgetStore.dispatch(fromBudgetActions.updateBudget({ updateBudget: budgetUpdate }))
  }

  saveForm() {
    this.budget = {
      budgetId: undefined,
      projId: this.prjId,
      budgetCategory: +this.selectedBudget.value,
      orgCostSharing: this.oneForAllBudgetForm.value.orgCostSharing,
      odotFunding: this.oneForAllBudgetForm.value.odotFunding,
      phaseId: this.oneForAllBudgetForm.value.phaseId,
      budgetTitle: this.oneForAllBudgetForm.value.title,
      qty: this.oneForAllBudgetForm.value.quantity,
      amount: this.oneForAllBudgetForm.value.amount,
      notes: this.oneForAllBudgetForm.value.notes,
      bcAltId: 0,
      budgetAmount: 500,
      activeInd: 'A',
      entryDt: new Date(),
      userId: 'sai'
    }
    console.log('budget object', this.budget);
    this.budgetStore.dispatch(fromBudgetActions.addBudget({ budget: this.budget }));


    this.toggleDialog();
    this.selectedBudget = this.budgetDefault;

  }

  public onAddClick(event: any) {
    if (this.selectedBudget?.value) {
      this.toggleDialog();
    }
  }

  private toggleDialog() {
    switch (this.selectedBudget.text.toLowerCase()) {
      case BudgetDialogCategories.salariesandwages.toLowerCase():
        this.openSalaryWagesDialog = !this.openSalaryWagesDialog;
        break;
      case BudgetDialogCategories.subcontractor.toLowerCase():
        this.openSubContractorDialog = !this.openSubContractorDialog;
        break;
      default:
        this.openOtherCategoriesDialog = !this.openOtherCategoriesDialog;
        break;
    }
  }

  private toggleBudgetGrid(budgetCat: string) {
    console.log('case', budgetCat);
    switch (budgetCat) {
      case BudgetDialogCategories.salariesandwages.toLowerCase():
        this.isSalaryWages = true;
        this.isSubContractor = false;
        this.isOther = false;
        break;
      case BudgetDialogCategories.subcontractor.toLowerCase():
        this.isSalaryWages = false;
        this.isSubContractor = true;
        this.isOther = false;
        break;
      default:
        this.isSalaryWages = false;
        this.isSubContractor = false;
        this.isOther = true;
        break;
    }
  }

  onItemSelect(data: { 'BudgetCategory': string; 'BudgetAmount': number; 'BcAltId': number }) {
    this.otherGridData = [];
    this.currentBcAltId = data.BcAltId;
    this.isOther = this.isSalaryWages = this.isSubContractor = false;
    this.changeDetector.detectChanges();
    this.otherGridData = this.allBudgets.filter(x => x.bcAltId == data.BcAltId).slice();
    this.toggleBudgetGrid(data.BudgetCategory.toString().toLowerCase());
  }


}
