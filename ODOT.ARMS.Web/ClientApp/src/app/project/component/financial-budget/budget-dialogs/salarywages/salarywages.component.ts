import { Component, OnInit, Input } from '@angular/core';
import { FinancialBudgetComponent } from '../../financial-budget.component';
import { Store } from '@ngrx/store';
import * as fromAdministration from '../../../../../manage/state/reducers/index';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-salarywages',
  templateUrl: './salarywages.component.html',
  styles: [
  ],
})
export class SalarywagesComponent implements OnInit {
  @Input() parent: FinancialBudgetComponent;
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
      quantity: [''],
      notes: [''],
      statusId: ['', Validators.required],
      statusTxt: ['']
    });
  }

  closeDialog() {
    this.parent.openSalaryWagesDialog = false;
  }

}
