import { Component, OnInit, Input } from '@angular/core';
import { FinancialBudgetComponent } from '../../financial-budget.component';
import { Store } from '@ngrx/store';
import * as fromAdministration from '../../../../../manage/state/reducers/index';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-subcontractor',
  templateUrl: './subcontractor.component.html',
  styles: [
  ],
})
export class SubcontractorComponent implements OnInit {
  @Input() parent: FinancialBudgetComponent;
  constructor(public store$: Store<fromAdministration.State>, public fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.parent.oneForAllBudgetForm = this.fb.group({
      title: ['', Validators.required],
      phaseId: ['', Validators.required],
      phaseTxt: [''],
      amount: ['']
    });
  }
  // odotFunding: [''],
  // orgCostSharing: [''],
  // statusId: ['', Validators.required],
  // statusTxt: ['']

  closeDialog() {
    this.parent.openSubContractorDialog = false;
  }

}
