import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { FinancialBudgetComponent } from '../../financial-budget.component';
import * as fromAdministration from '../../../../../manage/state/reducers/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-othercategories',
  templateUrl: './othercategories.component.html',
  styles: [
  ],
})
export class OthercategoriesComponent implements OnInit {
  @Input() parent: FinancialBudgetComponent;
  // public otherCategoryForm: FormGroup;
  constructor(public store$: Store<fromAdministration.State>, public fb: FormBuilder) {
    // super(store$); 
  }

  ngOnInit(): void {
    this.parent.oneForAllBudgetForm = this.fb.group({
      title: ['', Validators.required],
      phaseId: ['', Validators.required],
      phaseTxt: [''],
      odotFunding: [''],
      orgCostSharing: [''],
      statusId: ['', Validators.required],
      statusTxt: ['']
    });
  }

  closeDialog() {
    this.parent.openOtherCategoriesDialog = false;
  }

}
