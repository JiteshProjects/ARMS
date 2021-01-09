import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor } from '@progress/kendo-data-query';

import { GenericLookupListForDD } from '../../models/project-for-update';
import { PhaseRaw } from '../../models/projects';
import { ProjectService } from '../../services/project.service';
import * as fromCore from "../../../core/state/reducers";
import * as fromProject from "../../state/reducers";
import * as fromProjectPhase from '../../state/reducers/edit-project-phase-page.reducer';
import * as fromProjectPhaseSelectors from '../../state/selector/project-phase.selectors';
import * as fromProjectPhaseActions from '../../state/actions/edit-project-phase-page.actions';
import { setSavePhaseDialogStatus, setSelectedPhase, updatePhase, addPhase, mergePhases } from '../../state/actions/edit-project-phase-page.actions';
import { Phase } from '../../models/phase';


@Component({
  selector: 'app-edit-prj-phase-page',
  templateUrl: './edit-prj-phase-page.component.html'
})
export class EditPrjPhasePageComponent implements OnInit {

  public PhaseAddEditForm: FormGroup;
  public PhaseAddEditDialogOpened: boolean = false;
  public isNew: boolean = true;
  public endDt: Date;
  public beginDt: Date;
  public currencyMaxValue = 100000000;

  //public phases: Array<PhaseRaw>;
  public tempPhaseData: Array<PhaseRaw>;
  public flag: string = null;
  public initialCount: number = 0;
  public phaseString: string = null;
  public mergePhaseSum: number = 0.00;
  public startMin: Date = new Date(1900, 2, 10);
  public startMax: Date = new Date(2050, 2, 10);
  public endMin: Date = new Date(1900, 2, 10);
  public endMax: Date = new Date(2050, 2, 10);
  public mergePhaseId: string = this.generateGuid();
  //public phaseStatuses: Array<GenericLookupListForDD>;
  public gridData: GridDataResult;
  public sort: SortDescriptor[] = [{
    field: 'phaseNum',
    dir: 'asc'
  }];

  public phaseStatuses$: Observable<GenericLookupListForDD[]>;
  public phases$: Observable<PhaseRaw[]>;
  public selectedPhase$: Observable<PhaseRaw>;
  public savePhaseDialogStatus$: Observable<boolean>;
  public projectId$: Observable<string>;


  constructor(public fb: FormBuilder,
    public coreStore: Store<fromCore.State>,
    public projectPhaseStore: Store<fromProjectPhase.State>,
    private projectStore: Store<fromProject.State>) { }

  ngOnInit() {
    console.log('container phase');
    this.phaseStatuses$ = this.coreStore.select(fromCore.getPhaseStatuses);
    this.phases$ = this.projectPhaseStore.select(fromProjectPhaseSelectors.getAllPhases);
    this.selectedPhase$ = this.projectPhaseStore.select(fromProjectPhaseSelectors.getSelectedPhase);
    this.savePhaseDialogStatus$ = this.projectPhaseStore.select(fromProjectPhaseSelectors.getSavePhaseDialogStatus);
    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
  }

  public onSavePhase(phase: PhaseRaw): void {
    console.log('phase save', phase);
    if (phase.phaseId) {
      this.projectPhaseStore.dispatch(updatePhase({ phase: phase }))
    }
    else {
      this.projectPhaseStore.dispatch(addPhase({ phase: phase }));
    }

    this.projectPhaseStore.dispatch(setSavePhaseDialogStatus({ status: false })); //Close the form
  }

  public onSelectPhase(phase: PhaseRaw) {
    console.info('onslectPhase', phase);
    this.projectPhaseStore.dispatch(setSelectedPhase({ selectedPhase: phase }));
  }

  public onSetSavePhaseDialogStatus(dialogStatus: boolean): void {
    console.info('set phase dilaog', dialogStatus);
    this.projectPhaseStore.dispatch(setSavePhaseDialogStatus({ status: dialogStatus }));
  }

  public updateFooter() {
    this.mergePhaseSum = this.gridData.data.filter(item => item.mergeInd === 'M').reduce((sum, current) => sum + current.amount, 0);
    this.phaseString = this.gridData.data.filter(item => item.mergeInd === 'M').map(e => e.phaseNum).join(',');
  }

  public generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public onMergePhases(phases: PhaseRaw[]) {
    console.info('in container', phases);
    this.projectPhaseStore.dispatch(mergePhases({ projectId: phases[0].projId, phases: phases}))
  }



}
