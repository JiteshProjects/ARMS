import { Component, OnInit } from '@angular/core';
import { ChunkSettings, FileState, SelectEvent, UploadEvent, FileInfo } from '@progress/kendo-angular-upload';
import { PrjInfoBaseComponent } from '../prj-info-base/prj-info-base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentToDeactivate } from '../../../shared/models/component-to-deactivate';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { GridDataResult, DataBindingDirective, DataStateChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { process, State, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { Store, props } from '@ngrx/store';
import * as fromProjectTypereducer from '../../state/reducers/projecttype.reducers';
import * as fromProjectreducer from '../../state/reducers/project.reducer';
import * as fromProjectforDDreducer from '../../state/reducers/projectForDD.reducer';
import * as fromCbReducer from '../../state/reducers/controllingBoard.reducer';
import { HttpInterceptor, HttpResponse, HttpEventType, HttpRequest, HttpHandler, HttpProgressEvent, HttpEvent, HttpClient } from '@angular/common/http';
import { fileservice } from '../../../shared/services/files.services';
import * as fromAgencyreducer from '../../../agency/state/reducers/agencies.reducer';
import { EventsRaw, IEvents, IEventUpload, EventUpload } from '../../models/events'; // just for testing
import * as fromProjectForDDAction from '../../state/actions/projectForDD.actions';
import * as fromCBAction from '../../state/actions/controllingBoard.actions';
import { IControllingBoard } from '../../models/controllingBoard';
import { GenericLookupListForDD } from '../../models/project-for-update';
import { ProjectService } from '../../services/project.service';
@Component({
  selector: 'app-prj-cb',
  templateUrl: './prj-cb.component.html',
  styles: []
})
export class PrjCbComponent extends PrjInfoBaseComponent implements OnInit, ComponentToDeactivate {

  // constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, public projectStore: Store<fromProjectreducer.ProjectState>, public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>, public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>, public AgencyStore: Store<fromAgencyreducer.State>, public notificationService: kendonotificationservice, public eventStore: Store<fromEventReducer.EventState>, private http: HttpClient, public fielserviceExt: fielservice) {
  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, public projectStore: Store<fromProjectreducer.ProjectState>, public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>, public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>, public AgencyStore: Store<fromAgencyreducer.State>, public notificationService: kendonotificationservice, public cbStore: Store<fromCbReducer.CBState>, private http: HttpClient, public fielserviceExt: fileservice, public projectService: ProjectService) {
    super(router, fb, route, projectStore, projectTypeStore, projectForDDStore, AgencyStore, notificationService, projectService);
    this.CBAddEditForm = this.fb.group({
      controllingBoardId: [''],
      projectId: [''],
      controllingBoardNumber: [''],
      controllingBoardType: [0, Validators.required],
      controllingBoardStatus: [0, Validators.required],
      publicCommentText: [''],
      userId: [''],
      entryDate: new Date(),
      activeInd: [''],
      controllingBoardDate: new Date(),
      submissionDate: new Date(),
      controllingBoardCategory: [0, Validators.required],
      eventUploadForDD: new Array<EventUpload>(),
      files: new Array<File>()
    });
  }
  get f() { return this.CBAddEditForm.controls; }
  // Variables
  public CBData: Array<IControllingBoard>;
  public CBAddEditForm: FormGroup;
  public CBAddEditDialogOpened = false;
  public isNew = true;
  public pPublicComment = '';
  public maxChars = 255;
  public activeTabText = 'Controlling Board';
  private _kendoFiles: FileInfo[];
  public myFiles: Array<FileInfo>;
  public statusItems: Array<GenericLookupListForDD>;
  public CategoryItems: Array<GenericLookupListForDD>;
  public typeItems: Array<GenericLookupListForDD>;


  public UploadedDocumentList: Array<EventUpload> = new Array<EventUpload>(); // The event should be renamed because it can be used everywhere
  submitted: boolean;

  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{
    field: 'activeInd',
    dir: 'asc'
  }];
  private _filesSet: Set<File>;
  public formData: FormData;
  public sendable;

  public getIconFilePath(fileExtension: string): string {
    let ext = fileExtension.split('.')[1];
    return this.fielserviceExt.GetFileByExtension(ext);
  }

  public isComponentDirty(): boolean {
    return this.projectEditForm.dirty;
  }
  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.agencyStatusInd === 'I') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.load();
  }

  private load(): void {
    // this.grid_View = {
    //  data: orderBy(this.agencies, this.sort),
    //  total: this.agencies.length
    // };
  }

  public groupChange(obj) {

  }

  public AddEditCBeDialogClose() { }

  public populateCBForm(obj: any) {
    this.CBAddEditForm.patchValue({
      controllingBoardId: String(Object(obj)['controllingBoardId']),
      projectId: this.projectId,
      controllingBoardNumber: String(Object(obj)['controllingBoardNumber']) === 'null' ? null : String(Object(obj)['controllingBoardNumber']),
      controllingBoardType: Number(Object(obj)['controllingBoardType']) === 0 ? null : Number(Object(obj)['controllingBoardType']),
      controllingBoardStatus: Number(Object(obj)['controllingBoardStatus']) === 0 ? null : Number(Object(obj)['controllingBoardStatus']),
      publicCommentText: String(Object(obj)['publicCommentText']) === 'null' ? '' : String(Object(obj)['publicCommentText']),
      userId: String(Object(obj)['userId']),
      entryDate: (String(Object(obj)['entryDate'])) === 'null' ? new Date() : new Date((String(Object(obj)['entryDate']))),
      activeInd: String((Object(obj)['activeInd'])),
      controllingBoardDate: (String(Object(obj)['controllingBoardDate'])) === 'null' ? new Date() : new Date((String(Object(obj)['controllingBoardDate']))),
      submissionDate: (String(Object(obj)['submissionDate'])) === 'null' ? new Date() : new Date((String(Object(obj)['submissionDate']))),
      controllingBoardCategory: Number(Object(obj)['controllingBoardCategory']) === 0 ? null : Number(Object(obj)['controllingBoardCategory']),
      eventUploadForDD: null,
      files: null
    });
    this.myFiles = new Array<FileInfo>();
    if (!this.isNew) {
      this.UploadedDocumentList = Object(obj)['eventUploadForDD'] === null ? this.UploadedDocumentList : Object(obj)['eventUploadForDD'];
      if (this.UploadedDocumentList != null) {
        this.UploadedDocumentList = this.UploadedDocumentList.filter(e => e.activeInd != 'I');
        this.UploadedDocumentList.forEach(item => {
          this.myFiles.push({ name: item.documentName, size: item.fileSize, uid: item.eventUploadId, extension: item.privateInd });
        });
      }
    }
  }

  public onEditClick(obj) {
    this.submitted = true;
    this.isNew = false;
    this.populateCBForm(obj);
    this.CBAddEditDialogOpened = true;
  }

  public onAddClick(isNew) {
    this.submitted = true;
    this.CBAddEditDialogOpened = true;
    this.isNew = isNew;
    // this.setendMin();
    this.CBAddEditForm.reset();
    this.UploadedDocumentList = new Array<EventUpload>();
    this.populateCBForm(this.CBAddEditForm.value);
    this.CBAddEditForm.patchValue(
      {
        controllingBoardId: this.generateGuid(),
        projId: this.projectId,
        userId: 'Sai',
        activeInd: 'A'
      }
    );
    // this.isNew = obj;
    // this.CBAddEditDialogOpened = true;
    // this.PhaseAddEditForm.reset();
  }

  public AddEditCBDialogClose() {
    this.CBAddEditDialogOpened = false;
    // this.PhaseAddEditForm.reset();
  }
  public saveCB() {
    this.CBAddEditDialogOpened = false;

    if (this.isNew) {
      this.AddNewCB();
    } else {
      this.EditCB();
    }

    this.CBAddEditForm.patchValue({
      eventUploadForDD: this.UploadedDocumentList.length == 0 ? new Array<EventUpload>() : this.UploadedDocumentList
    });

    if (this.CBAddEditForm.valid) {
      try {
        if (this.sendable == null) {
          this.sendable = new FormData();
        }
        this.sendable.append('controllingBoardDD', JSON.stringify(this.CBAddEditForm.value));
      } catch (e) {
      }

      if (this.isNew) {
        this.cbStore.dispatch(fromCBAction.createCB({ formData: this.sendable }));
        this.notificationService.showSuccess('Administration Category  - ' + this.projectEditForm.value.projectTitleTxt + ' added Successfully!');
      } else {
        this.cbStore.dispatch(fromCBAction.updateCB({ formData: this.sendable }));
        this.notificationService.showSuccess('Administration Category  - ' + this.projectEditForm.value.projectTitleTxt + ' updated Successfully!');
      }
      this.CBAddEditForm.markAsPristine();
    }
  }
  public AddNewCB() {
    this.CBData = Object.assign([], this.CBData);
    let item = this.UploadedDocumentList.filter(e => e.activeInd == 'A');
    this.CBAddEditForm.patchValue(
      {
        document: item.length + ' Docs'
      }
    );
    this.CBData.push(this.CBAddEditForm.value);
  }
  public EditCB() {
    this.CBData = Object.assign([], this.CBData);
    let newItem = this.CBData.findIndex(e => e.controllingBoardId === this.CBAddEditForm.value.controllingBoardId);
    this.CBData[newItem] = this.CBAddEditForm.value;
    let item = this.UploadedDocumentList.filter(e => e.activeInd == 'A');
    this.CBData[newItem].document = item.length + ' Docs';
  }
  // This code only works for my hard coded data
  public DeleteCB(obj: any) {
    if (String(Object(obj)['activeInd']) == 'I') {
      Object(obj)['activeInd'] = 'A';
    } else {
      Object(obj)['activeInd'] = 'I';
    }
  }

  public InactivateFile(obj: any) {
    if (String(Object(obj)['activeInd']) == 'I') {
      Object(obj)['activeInd'] = 'A';
    } else {
      Object(obj)['activeInd'] = 'I';
    }
  }

  public onCBAddFileUploadClick() { }
  public remove(upload, uid: string) {
    this.CBAddEditForm.markAsDirty();
    upload.removeFilesByUid(uid);
    const updatedArray = Object.assign([], this.UploadedDocumentList);
    const foundIndex = updatedArray.findIndex(e => e.eventUploadId === uid);

    const newArray = updatedArray.map(a => ({ ...a }));
    newArray[foundIndex].activeInd = 'I';

    this.UploadedDocumentList = newArray;
    this.CBAddEditForm.patchValue(
      {
        eventUploadForDD: newArray
      }
    );
  }
  uploadEventHandler(e: UploadEvent) {
    this.CBAddEditForm.markAsDirty();
    try {
      this._kendoFiles = e.files;
      this._filesSet = new Set<File>();
      this.sendable = new FormData();
      for (let i = 0; i < this._kendoFiles.length; i++) {
        const rawFile: File = this._kendoFiles[i].rawFile;
        this.sendable.append('file' + this._kendoFiles[i].uid, rawFile, this._kendoFiles[i].name);
        this._filesSet.add(rawFile);

        this.UploadedDocumentList.push({
          eventUploadId: this._kendoFiles[i].uid,
          eventSrc: this.CBAddEditForm.value.controllingBoardId,
          documentName: rawFile.name,
          fileSize: rawFile.size,
          privateInd: 'A',
          activeInd: 'A',
          userId: 'Sai',
          uploadDate: new Date(),
          extension: '.' + this._kendoFiles[i].name.split('.')[1]
        });
        this.CBAddEditForm.patchValue(
          {
            eventUploadForDD: this.UploadedDocumentList
          }
        );
      }
    } catch (e) {
    }

  }
  public upload(filesSet: Set<File>) {
    filesSet.forEach(file => {
      // this.formData = new FormData();
      // this.formData.append('file', file, file.name);
    });
  }
  ngOnInit() {
    super.ngOnInit();
    this.LoadCBLookups();
  }
  LoadCBLookups() {
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadCBCategoryLoad);
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadCBTypeLoad);
    this.projectForDDStore.dispatch(new fromProjectForDDAction.CBStatusLoad);

    this.cbStore.dispatch(fromCBAction.loadSelectedCB({ projectId: this.projectId }));

    this.projectForDDStore.select(fromProjectforDDreducer.getCBStatusReducer).subscribe(
      items => {
        this.statusItems = items;
      });
    this.projectForDDStore.select(fromProjectforDDreducer.getCBCategoryReducer).subscribe(
      items => {
        this.CategoryItems = items;
      });
    this.projectForDDStore.select(fromProjectforDDreducer.getCBTypeReducer).subscribe(
      items => {
        this.typeItems = items;
      });

    this.cbStore.select(fromCbReducer.getAllCBs).subscribe(items => {
      this.CBData = items;
    });
  }

  public getTextById(id, type) {
    id = parseInt(id);
    let returnValue;
    try {
      if (type === 'category') {
        returnValue = this.CategoryItems.find(e => e.value === id) === null ? null : this.CategoryItems.find(e => e.value === id).text;
      }
      else if (type === 'type') {
        returnValue = this.typeItems.find(e => e.value === (id)) === null ? null : this.typeItems.find(e => e.value === id).text;
      }
      else if (type === 'status') {
        returnValue = this.statusItems.find(e => e.value === (id)) === null ? null : this.statusItems.find(e => e.value === id).text;
      }
    } catch (e) {
    }
    return returnValue;
  }
  public getChecked(uid) {
    this.CBAddEditForm.markAsDirty();
    const updatedArray = Object.assign([], this.UploadedDocumentList);
    const foundIndex = updatedArray.findIndex(e => e.eventUploadId === uid);
    const newArray = updatedArray.map(a => ({ ...a }));
    newArray[foundIndex].privateInd = updatedArray[foundIndex].privateInd === 'I' ? 'A' : 'I';
    this.UploadedDocumentList = newArray;
  }
}
