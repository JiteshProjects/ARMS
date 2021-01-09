import { Component, OnInit } from '@angular/core';
import { EventRaw } from '../../models/event-raw';
import { LookupItem } from '../../../shared/models/lookup-item';
import { Phase } from '../../models/phase';
import { Observable } from 'rxjs';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromCore from '../../../core/state/reducers';
import { UploadSrc, EventUpload } from '../../models/event-upload';
import * as fromProject from "../../state/reducers";
import { setSaveEventDialogStatus, setSelectedEvent, addEvent, updateEvent, setSelectedUploadEvent, updateEventDocCount } from '../../state/actions/edit-project-events-page.actions';
import { setUploadDialogStatus, setSelectedUploadSrc, updateUploadFileList, DownloadFileById, updateUpload } from '../../state/actions/file-uploads.actions';

@Component({
  selector: 'app-edit-prj-events-page',
  templateUrl: './edit-prj-events-page.component.html',
  styles: [
  ]
})

export class EditPrjEventsPageComponent implements OnInit {
  public projectId: string;
  public projAltId$: Observable<string>;
  public projAltId: string;
  public events$: Observable<EventRaw[]>;
  public selectUploadSrc$: Observable<UploadSrc>;
  public selectUploadEvent$: Observable<EventRaw>;
  public uploads$: Observable<EventUpload[]>;
  public selectedEvent$: Observable<EventRaw>;
  public phaseList$: Observable<Phase[]>;
  public primaryEvents$: Observable<LookupItem[]>;
  public secondaryEvents$: Observable<LookupItem[]>;
  public eventStatuses$: Observable<LookupItem[]>;
  public saveEventDialogStatus$: Observable<boolean>;
  public uploadDialogStatus$: Observable<boolean>;
  public uploads: any;

  constructor(public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>
  ) { }

  ngOnInit(): void {
    this.projectStore.select(fromProject.getProjectId).pipe(take(1)).subscribe(value => this.projectId = value);
    this.projAltId$ = this.projectStore.select(fromProject.selectProjectAltId);
    this.projAltId$.pipe(take(1)).subscribe(value => this.projAltId = value);
    //console.info(this.projectId);
    this.events$ = this.projectStore.select(fromProject.getAllEvents);

    this.selectUploadSrc$ = this.projectStore.select(fromProject.getSelectedUploadSrc);
    this.selectUploadEvent$ = this.projectStore.select(fromProject.getSelectedUploadEvent);
    this.uploads$ = this.projectStore.select(fromProject.getAllUploads);

    this.selectedEvent$ = this.projectStore.select(fromProject.getSelectedEvent);
    
    this.phaseList$ = this.projectStore.select(fromProject.getPhaseList);
    this.saveEventDialogStatus$ = this.projectStore.select(fromProject.getSaveEventDialogStatus); 

    this.uploadDialogStatus$ = this.projectStore.select(fromProject.getUploadEventDialogStatus);

    this.primaryEvents$ = this.coreStore.select(fromCore.getPrimaryEvents);
    this.secondaryEvents$ = this.coreStore.select(fromCore.getSecondaryEvents);
    this.eventStatuses$ = this.coreStore.select(fromCore.getEventStatuses);
  }

  onSelectEvent(event: EventRaw): void {
    this.projectStore.dispatch(setSelectedEvent({ event: event }));
  }

  onSaveEvent(event: EventRaw): void {
    console.log('onSaveEvent - container', event.eventId);
    if (event.eventId) {
      this.projectStore.dispatch(updateEvent({ event: event }));
    } else {
      event.projectId = this.projectId;
      this.projectStore.dispatch(addEvent({ event: event }));
    }
    this.projectStore.dispatch(setSaveEventDialogStatus({ status: false }));//Close the form
  }

  onSetSaveEventDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setSaveEventDialogStatus({ status: dialogStatus }));
  }

  onSetUploadDialogStatus(dialogStatus: boolean): void {
    this.projectStore.dispatch(setUploadDialogStatus({ status: dialogStatus }));
  }

  onSelectUploadDoc(event: EventRaw): void {
    this.projectStore.dispatch(setSelectedUploadEvent({ event: event }));//Keep track of this to update the document count
    this.projectStore.dispatch(setSelectedUploadSrc({ src: new UploadSrc(this.projAltId, event.eventId) }));
  }

  onUploadFilesChange(userFiles: Array<any>): void {
    this.projectStore.dispatch(updateUploadFileList({ files: userFiles }));//Force the file list to reload
    // Is this a correct way of doing this?????
    this.selectUploadEvent$.pipe(take(1)).subscribe(ev => {
      let updateCnt = Object.assign({}, ev);//Maky Maky copy
      updateCnt.docCnt += userFiles.length; //Add Add number
      this.projectStore.dispatch(updateEventDocCount({ event: updateCnt }));//Force a new doc count
    });
  }

  onDownload(downloadIds: EventUpload): void {
    this.projectStore.dispatch(DownloadFileById({ projAltId: downloadIds.projAltId, srcId: downloadIds.eventSrc, uploadId: downloadIds.eventUploadId }));
  }

  onUpdateFileUpload(upload: EventUpload): void {
    this.projectStore.dispatch(updateUpload({ upload: upload }));
  }

}
