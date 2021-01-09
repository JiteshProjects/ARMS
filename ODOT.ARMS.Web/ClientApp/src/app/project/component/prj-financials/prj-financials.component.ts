import { Component, OnInit } from '@angular/core';
import { PrjInfoBaseComponent } from '../prj-info-base/prj-info-base.component';
import { ComponentToDeactivate } from '../../../shared/models/component-to-deactivate';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromProjectTypereducer from "../../state/reducers/projecttype.reducers";
import * as fromAgencyreducer from '../../../agency/state/reducers/agencies.reducer';
import * as fromProjectforDDreducer from '../../state/reducers/projectForDD.reducer';
import * as fromProjectreducer from "../../state/reducers/project.reducer";
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';

@Component({
  selector: 'app-prj-financials',
  templateUrl: './prj-financials.component.html',
  styles: []
})
export class PrjFinancialsComponent extends PrjInfoBaseComponent implements OnInit, ComponentToDeactivate {
  overViewData: { 'Description': string; 'Amount': string; }[];
  phaseDataData: { 'Phase': string; 'Category': string; 'Budget': string; 'Invoiced': string; 'Balanced': string; }[];
  budgetDataData: { 'BudgetCategory': string; 'BudgetAmount': string; }[];
  budgetCategoryData: { 'Phase': string; 'Title': string; 'Quantity': string; 'ODOTFunding': string; 'OrgCostSharing': string; 'Status': string; }[];
  listItems: any;
  phaseItems: string[];
  AddEditDialogOpened: boolean;

  isComponentDirty(): boolean {
    return this.projectEditForm.dirty;
  }
  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, public projectStore: Store<fromProjectreducer.ProjectState>, public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>, public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>, public AgencyStore: Store<fromAgencyreducer.State>, public notificationService: kendonotificationservice) {
    super(router, fb, route, projectStore, projectTypeStore, projectForDDStore, AgencyStore, notificationService);
  }
  public gridOverViewData: any[];
  public gridPhaseData: any[];
  public gridBudgetData: any[];
  public gridBudgetCategoryData: any[];

  ngOnInit() {
    this.overViewData = [{
      'Description': 'Total Contract Amount',
      'Amount': '$80000'
    },
    {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    },
    {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    }, {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    }, {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    }, {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    }, {
      'Description': 'Total Contract Amount',
      'Amount': '$7677'
    },

    ];
    this.phaseDataData = [{
      'Phase': 'Phase I',
      'Category': 'Salary and Wages',
      'Budget': '1500',
      'Invoiced': '209090999',
      'Balanced': '798788888'
    },
    {
      'Phase': 'Phase I',
      'Category': 'Salary and Wages',
      'Budget': '1500',
      'Invoiced': '209090999',
      'Balanced': '798788888'
    },
    {
      'Phase': 'Phase I',
      'Category': 'Salary and Wages',
      'Budget': '1500',
      'Invoiced': '209090999',
      'Balanced': '798788888'
    },
    {
      'Phase': 'Phase I',
      'Category': 'Salary and Wages',
      'Budget': '1500',
      'Invoiced': '209090999',
      'Balanced': '798788888'
    },
    {
      'Phase': 'Phase I',
      'Category': 'Salary and Wages',
      'Budget': '1500',
      'Invoiced': '209090999',
      'Balanced': '798788888'
    },
    {
      'Phase': 'Phase I',
      'Category': 'Salary and Wages',
      'Budget': '1500',
      'Invoiced': '209090999',
      'Balanced': '798788888'
    }
    ];
    this.budgetDataData = [
      {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      },
      {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      }, {
        'BudgetCategory': 'Salaries and Wages',
        'BudgetAmount': '43433434',
      },
    ];
    this.budgetCategoryData = [
      {
        'Phase': 'Phase 1',
        'Title': 'Grod students',
        'Quantity': '4',
        'ODOTFunding': '0',
        'OrgCostSharing': '',
        'Status': 'Active'
      },
      {
        'Phase': 'Phase 1',
        'Title': 'Grod students',
        'Quantity': '4',
        'ODOTFunding': '0',
        'OrgCostSharing': '',
        'Status': 'Active'
      }, {
        'Phase': 'Phase 1',
        'Title': 'Grod students',
        'Quantity': '4',
        'ODOTFunding': '0',
        'OrgCostSharing': '',
        'Status': 'Active'
      }, {
        'Phase': 'Phase 1',
        'Title': 'Grod students',
        'Quantity': '4',
        'ODOTFunding': '0',
        'OrgCostSharing': '',
        'Status': 'Active'
      }, {
        'Phase': 'Phase 1',
        'Title': 'Grod students',
        'Quantity': '4',
        'ODOTFunding': '0',
        'OrgCostSharing': '',
        'Status': 'Active'
      },
    ];

    this.gridOverViewData = this.overViewData;
    this.gridPhaseData = this.phaseDataData;
    this.gridBudgetData = this.budgetDataData;
    this.gridBudgetCategoryData = this.budgetCategoryData
    this.phaseItems = ["Phase 1", "Phase 2", "Phase 3"];
    this.AddEditDialogOpened = false;
  }
  public AddEditDialogClose() {
    this.AddEditDialogOpened = false;
  }
  public onAddClick(event) {
    this.AddEditDialogOpened = true;
  }
}
