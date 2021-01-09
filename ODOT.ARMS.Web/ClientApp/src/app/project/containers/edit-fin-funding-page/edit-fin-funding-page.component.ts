import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FundingRaw } from '../../models/fundings-raw';
import * as fromCore from '../../../core/state/reducers';
import * as fromFunding from "../../state/reducers/edit-fin-funding-page.reducer";
import { setSaveFundingDialogStatus, setSelectedFunding, addFunding, updateFunding, updateFundingDocCount, setSelectedUploadFunding } from '../../state/actions/edit-funding-page.actions';
import * as fundingSelector from "../../state/selector/project.funding.selectors";
import { take } from "rxjs/operators";
import { LookupItem } from '../../../shared/models/lookup-item';
import { setSelectUploadSrcSuccess } from '../../state/actions/edit-prj-cb-page.actions';
import { loadFundingReferenceData } from '../../../core/state/actions/reference-data.actions';
import * as fromProject from "../../state/reducers";
import * as fromFundingReducer from "../../state/selector/project.funding.selectors";
import { setSaveEventDialogStatus, setSelectedEvent, addEvent, updateEvent, setSelectedUploadEvent, updateEventDocCount } from '../../state/actions/edit-project-events-page.actions';
import { setUploadDialogStatus, setSelectedUploadSrc, updateUploadFileList, DownloadFileById, updateUpload } from '../../state/actions/file-uploads.actions';

import { UploadSrc, EventUpload } from '../../models/event-upload';
import { EventRaw } from '../../models/event-raw';

@Component({
  selector: 'app-edit-fin-funding-page',
  templateUrl: './edit-fin-funding-page.component.html',
  styles: [
  ]
})

export class EditFinFundingPageComponent implements OnInit {
  public projectId: string;
  public fundingType$: Observable<LookupItem[]>;
  public fundingSource$: Observable<LookupItem[]>;
  public saveFundingDialogStatus$: Observable<boolean>;
  public uploadDialogStatus$: Observable<boolean>;
  public selectUploadSrc$: Observable<UploadSrc>;
  public uploads$: Observable<EventUpload[]>;
  public selectUploadFunding$: Observable<FundingRaw>;
  public selectedFunding$: Observable<FundingRaw>;
  public projAltId$: Observable<string>;
  public projAltId: string;

  public fundings$: Observable<FundingRaw[]>;
  constructor(public coreStore: Store<fromCore.State>, public projectStore: Store<fromProject.State>,
    public fundingStore: Store<fromFunding.State>) { }
  ngOnInit(): void {
    this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId = value);
    this.fundings$ = this.fundingStore.select(fromFundingReducer.getAllFundings);
    this.selectUploadFunding$ = this.fundingStore.select(fromFundingReducer.getSelectedUploadFunding);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId$.pipe(take(1)).subscribe(value => this.projAltId = value);

    this.selectUploadSrc$ = this.projectStore.select(fromProject.getSelectedUploadSrc);
    this.uploads$ = this.projectStore.select(fromProject.getAllUploads);
    this.saveFundingDialogStatus$ = this.projectStore.select(fundingSelector.getSaveFundingDialogStatus);
    //this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId$ = value);
    //this.Fundings$ = this.projectStore.select(fromProject.);
    this.fundingType$ = this.coreStore.select(fromCore.getFundingType);
    this.fundingSource$ = this.coreStore.select(fromCore.getFundingSource);
    this.uploadDialogStatus$ = this.projectStore.select(fromProject.getUploadEventDialogStatus);
    this.selectedFunding$ = this.fundingStore.select(fromFundingReducer.getSelectedFunding);

  }
  onSelectFunding(funding: FundingRaw): void {
    debugger;

    if (funding === undefined) {
      this.fundingStore.dispatch(setSelectedFunding({ Funding: funding }));
    }
    else {
      var result = new FundingRaw();
      this.fundingStore.dispatch(setSelectedFunding({
        Funding: {
          activeInd: funding.activeInd, docCnt: funding.docCnt, encubranceTypeCD: funding.encubranceTypeCD, entryDate: funding.entryDate, fiscalYr: funding.fiscalYr, amount: funding.amount, fundingSrcCD: funding.fundingSrcCD, fundingTypeCD: funding.fundingTypeCD, encubrancePONum: funding.encubrancePONum, encumbranceId: funding.encumbranceId, notes: funding.notes, projectId: funding.projectId, userId: funding.userId
        }
      }));
    }
  }
  onSetSaveFundingDialogStatus(dialogStatus: boolean): void {
    this.fundingStore.dispatch(setSaveFundingDialogStatus({ status: dialogStatus }));
  }
  onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadDialogStatus({ status: dialogStatus }));
  }
  onUploadFilesChange(userFiles: Array<any>): void {
    debugger;
    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
    // Is this a correct way of doing this?????
    this.selectUploadFunding$.pipe(take(1)).subscribe(ev => {
      let updateCnt = Object.assign({}, ev);
      updateCnt.docCnt += userFiles.length;
      this.fundingStore.dispatch(updateFundingDocCount({ Funding: updateCnt }));//Force a new doc count
    });
  }
  onDownload(downloadIds: EventUpload): void {
    this.projectStore.dispatch(DownloadFileById({ projAltId: downloadIds.projAltId, srcId: downloadIds.eventSrc, uploadId: downloadIds.eventUploadId }));
  }
  onUpdateFileUpload(upload: EventUpload): void {
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }

  onSelectUploadDoc(funding: FundingRaw): void {
    this.projectStore.dispatch(setSelectedUploadFunding({ Funding: funding }));//Keep track of this to update the document count
    this.projectStore.dispatch(setSelectedUploadSrc({ src: new UploadSrc(this.projAltId, funding.encumbranceId) }));
  }
  onSaveFunding(Funding: FundingRaw): void {
    debugger;
    console.log('onSaveFunding - container', Funding.encumbranceId);
    if (Funding.encumbranceId) {
      this.fundingStore.dispatch(updateFunding({ Funding: Funding }));
    } else {
      Funding.projectId = this.projectId;
      Funding.entryDate = new Date();
      Funding.encubranceTypeCD = 0;
      this.fundingStore.dispatch(addFunding({ Funding: Funding }));
    }
      this.fundingStore.dispatch(setSaveFundingDialogStatus({ status: false }));//Close the form
    }
}