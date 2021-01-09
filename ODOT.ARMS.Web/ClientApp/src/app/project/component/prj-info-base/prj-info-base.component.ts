import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AgencyDetailModel } from '../../../agency/models/agencydetails.module';
import * as fromAgencyAction from '../../../agency/state/actions/agency.actions';
import * as fromAgencyreducer from '../../../agency/state/reducers/agencies.reducer';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { GenericLookupListForDD, VendorAddressForDD } from '../../models/project-for-update';
import { IPhase, PassProjectData, Project } from '../../models/projects';
import { ProjectService } from '../../services/project.service';
import * as fromProjectAction from '../../state/actions/project.actions';
import * as fromProjectForDDAction from "../../state/actions/projectForDD.actions";
import * as fromProjectreducer from "../../state/reducers/project.reducer";
import * as fromProjectforDDreducer from '../../state/reducers/projectForDD.reducer';
import * as fromProjectTypereducer from "../../state/reducers/projecttype.reducers";

@Component({
  selector: 'app-prj-info-base',
  templateUrl: './prj-info-base.component.html',
  styles: []
})
export class PrjInfoBaseComponent implements OnInit {
  IsDisabledImplementation: boolean = true;
  public projectEditForm: FormGroup;
  projectId: string;
  sub: any;
  public tabName: string = null;
  public isSaveButtonDisabled: boolean = true;
  public selectedStandard: FormGroup;
  constructor(public router: Router, public fb: FormBuilder, public route: ActivatedRoute, public projectStore: Store<fromProjectreducer.ProjectState>, public projectTypeStore: Store<fromProjectTypereducer.ProjectTypeState>, public projectForDDStore: Store<fromProjectforDDreducer.ProjectState>, public AgencyStore: Store<fromAgencyreducer.State>, public notificationService: kendonotificationservice, public projectService: ProjectService) {
    this.projectEditForm = this.fb.group({
      projectClassificationId: [''],
      projectStatusId: [''],
      projectTitleTxt: [''],
      rfpNum: ['', Validators.required, this.rfpvalidator()],
      ideaNum: [''],
      fedAuthNum: [''],
      stateJobNum: [''],
      agreementNum: [''],
      pidNum: [''],
      propFiscalYr: 0,
      tpfNum: [''],
      contractStartDt: [''],
      contractEndDt: [''],
      agencyId: [''],
      vendorIdTxt: [''],
      addressCd: [''],
      impStatusInd: [''],
      standardDeliverableInd: [''],
      projectDuration: [''],
      currentEndDt: new Date(),
      summaryTxt: [''],
      goalsTxt: [''],
      activeInd: [''],
      projId: [''],
      userId: [''],
      entryDt: new Date(),
      objectiveTxt: [''],
      withholdingAmount:[''],
      phaseList: new Array<IPhase>(),
      projectTypeList: new Array<GenericLookupListForDD>()
    });
  }
  get f() { return this.projectEditForm.controls; }
  public maxChars = 255;
  public pProjectTitle = "";
  public projectStatusList: Array<GenericLookupListForDD>;
  public projectTypesList: Array<GenericLookupListForDD>;
  public agenciesList: Array<AgencyDetailModel>;
  public passDataObject: PassProjectData;
  public projectList: Project = new Project();
  public projects: Array<Project> = new Array<Project>();
  public yn_listItems: Array<{ text: string, value: string }> = [{ text: "Yes", value: "Y" }, { text: "No", value: "N" }];
  public isDisabledAddressCode: boolean = true;
  public vendorAddressList: Array<VendorAddressForDD>;
  public selecctedResearchAgencyValue: { agencyId: number, agencyNameTxt: string, vendorId: string };
  public selecctedProjectStatus: { text: string, value: number };
  public selecctedImplemented: { text: string, value: string };
  public selecctedStandardDeliverables: { text: string, value: string };
  public selecctedStandardAddresscode: { addressseqno: string, OaskVendorNo: string };
  public agencyData: Array<AgencyDetailModel>;

  public defaultAgencyItem: {
    agencyId: number,
    agencyNameTxt: string,
    agencyCatText: string,
    agencyCatId: number,
    agencyStatusInd: string,
    controlBoardApprvlInd: string,
    activeInd: string,
    vendorId: string,
    userId: string,
    entryDt: Date
  } = {
      agencyId: null,
      agencyNameTxt: "Please Select Research Agency",
      agencyCatText: null,
      agencyCatId: null,
      agencyStatusInd: null,
      controlBoardApprvlInd: null,
      activeInd: null,
      vendorId: null,
      userId: null,
      entryDt: null
    };

  public prjType: string;
  ngOnInit(): void {
    this.tabName = this.router.url.split('/').pop();
    this.sub = this.route
      .data
      .subscribe(v => this.prjType = v.PrjType);
    this.LoadLookups();
  }
  public getProjectForm(): Project {
    return this.projectEditForm.value;
  }
  LoadLookups() {
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadProjectStatus);
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadProjectTypes);

    this.AgencyStore.dispatch(new fromAgencyAction.LoadAgencyAction());

    this.projectTypeStore.dispatch(fromProjectAction.loadProjectTypes());
    this.projectTypeStore.dispatch(fromProjectAction.loadProject());


    this.projectForDDStore.pipe(select(fromProjectforDDreducer.getProjectStatusReducer)).subscribe(
      itemList => {
        (this.projectStatusList = itemList);
      });

    this.AgencyStore.pipe(select(fromAgencyreducer.getAgencyReducer)).subscribe(
      agencies => {
        this.agenciesList = agencies;
        this.agencyData = this.agenciesList.slice();
      });
    this.projectForDDStore.pipe(select(fromProjectforDDreducer.getCurrentProjectReducer)).subscribe(
      item => {
        this.passDataObject = item;
        if (this.passDataObject != null) {
          this.projectStore.select(fromProjectreducer.getAllProject).subscribe(
            data => {
              this.projects = data;
              let code = this.passDataObject.projectTypeId;
              this.prjType = this.passDataObject.projectType;
              this.projectList = data.find(e => e.projectAltId == this.passDataObject.projectAltId);
              if (this.projectList != undefined) {
                //if (!this.projectEditForm.dirty) {
                //  this.projectEditForm.reset();
                //}
                this.projectId = this.projectList.projId;
                this.projectService.shareProjectSelected(this.projectList);
                const selectedStandard = this.projectList;
                this.populateData(selectedStandard, code);
              }
              else {
                //if (!this.projectEditForm.dirty) {
                //  this.projectEditForm.reset();
                //}
                this.projectId = this.generateGuid();
                this.projectEditForm.patchValue({
                  projId: this.projectId,
                  projectClassificationId: code
                });

                //if (this.projectEditForm.status === "INVALID" && this.projectEditForm.value.projectClassificationId != "" && this.projectEditForm.dirty) {
                //  this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadTempProject(this.projectEditForm.value));
                //}
                //this.projectForDDStore.select(fromProjectforDDreducer.getStoreProjectReducer).subscribe(
                //  selectProject => {
                //    if (selectProject != null) {
                //      var item = selectProject;
                //      this.populateData(selectProject, code);
                //    }
                //  });
              }
            });
        }
      });
    this.projectForDDStore.select(fromProjectforDDreducer.getProjectTypesReducer).subscribe(
      itemList => {
        this.projectTypesList = itemList;
      });

  }

  ngOnDestroy() {
    //this.sub.unsubscribe();
  }

  public monthDiff(dateFrom, dateTo) {
    if (dateFrom == '' || dateTo == '') return '';
    var calculateValue = dateTo.getMonth() - dateFrom.getMonth() +
      (12 * (dateTo.getFullYear() - dateFrom.getFullYear()));
    return calculateValue;

  }

  public onChangeStartDate(value: Date) {
    this.projectEditForm.patchValue({
      contractStartDt: value,//new Date(value.getFullYear(),value.getMonth(), value.getDay()),
      projectDuration: this.monthDiff(value, this.projectEditForm.value.contractEndDt)
    }
    );
  }

  public onChangeEndDate(value: Date) {
    this.projectEditForm.patchValue({
      contractEndDt: value,//new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDay())),
      projectDuration: this.monthDiff(this.projectEditForm.value.contractStartDt, value)
    }
    );
  }

  public valueChange(value: any): void {
    //this.selectedProjectType = value;
  }

  public generateGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  public populateData(selectedStandard: any, code: any) {
    this.projectEditForm.setValue({
      projectClassificationId: code,
      projectStatusId: selectedStandard.projectStatusId,
      projectTitleTxt: selectedStandard.projectTitleTxt,
      rfpNum: selectedStandard.rfpNum,
      ideaNum: selectedStandard.ideaNum,
      fedAuthNum: selectedStandard.fedAuthNum,
      stateJobNum: selectedStandard.stateJobNum,
      agreementNum: selectedStandard.agreementNum,
      pidNum: selectedStandard.pidNum,
      propFiscalYr: parseInt(selectedStandard.propFiscalYr, 0),
      tpfNum: selectedStandard.tpfNum,
      contractStartDt: selectedStandard.contractStartDt,
      contractEndDt: selectedStandard.contractEndDt,
      agencyId: selectedStandard.agencyId,
      vendorIdTxt: selectedStandard.vendorIdTxt,
      addressCd: selectedStandard.addressCd,
      impStatusInd: selectedStandard.impStatusInd,
      standardDeliverableInd: selectedStandard.standardDeliverableInd,
      projectDuration: selectedStandard.projectDuration,
      currentEndDt: selectedStandard.currentEndDt,
      summaryTxt: selectedStandard.summaryTxt,
      goalsTxt: selectedStandard.goalsTxt,
      activeInd: selectedStandard.activeInd,
      projId: selectedStandard.projId,
      userId: selectedStandard.userId,
      entryDt: selectedStandard.entryDt,
      objectiveTxt: selectedStandard.objectiveTxt,
      projectTypeList: selectedStandard.projectTypeList,
      phaseList: selectedStandard.phaseList

    });
    this.selecctedResearchAgencyValue = {
      agencyId: selectedStandard.agencyId,
      agencyNameTxt: selectedStandard.vendorIdTxt,
      vendorId: selectedStandard.vendorIdTxt

    },
      this.selecctedImplemented = {
        text: null,//selectedStandard.impStatusInd = "N" ? "No" : "Yes",
        value: selectedStandard.impStatusInd
      },
      this.selecctedStandardDeliverables = {
        text: null,//selectedStandard.standardDeliverableInd = "N" ? "No" : "Yes",
        value: selectedStandard.standardDeliverableInd
      },
      this.selecctedProjectStatus = {
        text: null,
        value: selectedStandard.projectStatusId
      }
    if (selectedStandard.vendorIdTxt != "") {
      this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadVendorAddressLoad(selectedStandard.vendorIdTxt));
    }
    this.projectForDDStore.pipe(select(fromProjectforDDreducer.getVendorAddressTypesReducer)).subscribe(
      itemList => {
        if (itemList.length > 0) {
          this.isDisabledAddressCode = false;
        }
        else this.isDisabledAddressCode = true;
        {
          this.vendorAddressList = itemList;
          this.selecctedStandardAddresscode = {
            OaskVendorNo: null,
            addressseqno: selectedStandard.addressCd === null ? "Select Address Code" : selectedStandard.addressCd
          }
          //this.selecctedStandardAddresscode = itemList.filter(e => e.OaskVendorNo == selectedStandard.addressCd);
        }
      });

  }

  handleAgencyChange(value) {
    this.isDisabledAddressCode = true;
    this.vendorAddressList = [];
    this.selecctedResearchAgencyValue = {
      agencyId: value.agencyId,
      agencyNameTxt: null,
      vendorId: value.vendorId
    }
    this.projectEditForm.patchValue({
      addressCd: null
    }
    );
    this.projectEditForm.patchValue({
      agencyId: value.agencyId,
      vendorIdTxt: value.vendorId
    }
    );
    if (value.vendorId == this.defaultAgencyItem.vendorId) {
      this.isDisabledAddressCode = true;
      this.vendorAddressList = [];
      this.selecctedStandardAddresscode = {
        OaskVendorNo: null,
        addressseqno: 'Select Address Code'
      }

    } else {
      this.isDisabledAddressCode = false;
      this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadVendorAddressLoad(value.vendorId));
      this.projectForDDStore.pipe(select(fromProjectforDDreducer.getVendorAddressTypesReducer)).subscribe(
        itemList => {
          if (itemList.length > 0) {
            this.isDisabledAddressCode = false;
          }
          else this.isDisabledAddressCode = true;
          this.selecctedStandardAddresscode = {
            OaskVendorNo: null,
            addressseqno: 'Select Address Code'
          };
          (this.vendorAddressList = itemList);
        });
    }
  }

  handleImplementedChange(value) {
    this.projectEditForm.patchValue({
      impStatusInd: value.value
    });
  }

  handleDeliverableChange(value) {
    this.projectEditForm.patchValue({
      standardDeliverableInd: value.value
    }
    );
  }

  changeProjectStatus(value) {
    this.projectEditForm.patchValue({
      projectStatusId: value.value
    }
    );
    this.IsDisabledImplementation = value.text === 'Proposed' ? false : true;
  }

  handleAddressCodeChange(value) {
    this.projectEditForm.patchValue({
      addressCd: value.addressseqno
    }
    );
  }

  handleFilter(value) {
    this.agencyData = this.agenciesList.filter((s) => s.agencyNameTxt.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public rfpvalidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchRFPId(control.value)
        .pipe(
          map(res => {
            if (res != "~") {
              // return error
              return { 'rfpNumExists': true };
            }
          })
        );
    };

  }
  public searchRFPId(text) {
    return timer(1)
      .pipe(
        switchMap(() => {
          var result;
          if (this.projectList == undefined) {
            result = this.projects.find(function (item) {
              return (item.rfpNum) == (text);
            });
          }
          if (this.projectList != undefined && this.projectList.rfpNum != text) {
            result = this.projects.find(function (item) {
              return (item.rfpNum) == (text);
            });
          }
          var resu = result && result.rfpNum || '~';
          return resu;
        })
      );
  }

  public save() {
    //this.component.projectEditForm.dirty && 
    if (this.projectEditForm.valid) {
      var projectId = this.passDataObject.projectTypeId;
      var rfpNo = this.projectEditForm.value.rfpNum;
      var projectAltId = this.passDataObject.projectAltId;
      if (this.projectEditForm.value.userId != "") {
        const updateProjectObj: Update<Project> = {
          id: this.projectEditForm.value.projId,
          changes: {
            ...this.projectEditForm.value,
            projectAltId
          }
        };
        this.projectTypeStore.dispatch(fromProjectAction.updateProject({ update: updateProjectObj }));
        this.notificationService.showSuccess('Project - ' + this.projectEditForm.value.projectTitleTxt + ' updated Successfully!');
        //this.store$.dispatch(fromProjectAction.loadSelectedProject({ projectId: this.component.projectEditForm.value.projId }));
        this.projectEditForm.markAsPristine();
        //this.projectEditForm.reset();
        //this.projectEditForm.reset();
        this.router.navigate(['/project', 'edit', projectId, projectAltId, 'prj', this.tabName]);


      }
      else {
        this.projectTypeStore.dispatch(fromProjectAction.createProject({ project: this.projectEditForm.value }));
        this.notificationService.showSuccess('Administration Category  - ' + this.projectEditForm.value.projectTitleTxt + ' added Successfully!');
        this.projectEditForm.markAsPristine();
        //this.projectEditForm.reset();
        this.router.navigate(['/project', 'edit', projectId, rfpNo, 'prj', this.tabName]);
        //this.store$.dispatch(fromProjectAction.loadSelectedProject({ projectId: this.component.projectEditForm.value.projId }));
      }
      return true;
    }
    else {
      return false;
    }

  }

  public getPidInfo() {
    var pidNumber = this.projectEditForm.controls.pidNum.value;
    if (pidNumber) {
      this.projectForDDStore.dispatch(new fromProjectForDDAction.WarehouseDetailLoad(pidNumber));
    }
    this.projectForDDStore.pipe(select(fromProjectforDDreducer.getWarehouseDetailReducer)).subscribe(
      item => {
        if (item) {
          this.projectEditForm.patchValue({
            pidNum: String(item.pidNumber),
            agreementNum: item.agreementNumber,
            fedAuthNum: item.fanNumber,
            stateJobNum: item.stateJobNumber,
          });
        }
      });
  }

  public getTxtById(id: any, lst: Array<GenericLookupListForDD>): string {
    if ((typeof (id) === 'undefined') || (id === null) || (id === "null"))
      return '';

    console.log(id);
    try {
      return lst.find(e => e.value === id) === null ? null : lst.find(e => e.value === id).text;
    } catch (e) {
      console.log(e);
    }
    return '';
  }
}
