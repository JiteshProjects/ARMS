import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProjectInfo } from '../../models/projectInfo';
import * as fromProject from '../../state/reducers';
import { ProjectService } from '../../services/project.service';
import * as fromProjectInfo from '../../state/reducers/project-info.reducer';
import * as fromProjectforDD from '../../state/reducers/projectForDD.reducer';
import * as fromAgency from '../../../agency/state/reducers/agencies.reducer';
import * as fromProjectSelectors from '../../state/selector/project-info.selectors';
import * as fromProjectInfoActions from '../../state/actions/project-info.actions';
import * as  fromProjectForDDAction from '../../state/actions/projectForDD.actions';
import * as fromAgencyAction from '../../../agency/state/actions/agency.actions';
import { GenericLookupListForDD, WarehouseData } from '../../models/project-for-update';
import { AgencyDetailModel } from 'src/app/agency/models/agencydetails.module';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-prj-info-page',
  templateUrl: './prj-info-page.component.html'
})
export class PrjInfoPageComponent implements OnInit {

  public ProjectInfo$: Observable<ProjectInfo>;
  public projectAltId$: Observable<string>;
  public projectTypes$: Observable<GenericLookupListForDD[]>;
  public projectTypeId$: Observable<string>;
  public projectStatus$: Observable<GenericLookupListForDD[]>;
  public agencies$: Observable<AgencyDetailModel[]>;
  public isNew$: Observable<boolean>;
  public isNew: boolean;
  public addressCode$: Observable<string[]>;
  public warehouseInfo$: Observable<WarehouseData>;

  constructor(
    private projInfoStore: Store<fromProjectInfo.ProjectInfoState>,
    private projectForDDStore: Store<fromProjectforDD.ProjectState>,
    private agencyStore: Store<fromAgency.AgencyState>,
    public projStore: Store<fromProject.State>,
    public projService: ProjectService
  ) { }

  ngOnInit(): void {
    this.loadDropDowns();

   console.log('Starting the project Info component');
   this.isNew$ = this.projStore.select(fromProject.selectIsNewProject);
   this.isNew = this.projService.getParamBool(this.isNew$);
   this.projectTypeId$ = this.projStore.select(fromProject.selectProjectTypeId);

   if (!this.isNew) {
    this.projectAltId$ = this.projStore.select(fromProject.selectProjectAltId);
    const prjAltId = this.projService.getParam(this.projectAltId$);
    this.ProjectInfo$ = this.projInfoStore.select(fromProjectSelectors.selectProjInfoByAltId(prjAltId));
   }
   this.projectTypes$ = this.projectForDDStore.select(fromProjectforDD.getProjectTypesReducer);
   this.projectStatus$ = this.projectForDDStore.select(fromProjectforDD.getProjectStatusReducer);
   this.agencies$ = this.agencyStore.select(fromAgency.getAgencyReducer);
   this.warehouseInfo$ = this.projectForDDStore.select(fromProjectforDD.getWarehouseDetailReducer);
   this.addressCode$ = this.projectForDDStore.select(fromProjectforDD.getVendorAddressTypesReducer).pipe(map(x => x.map(y => {
      console.log(y);
      return y.addressSeqNo;
    }
    )));
  }
  public saveProjInfo(projectInfo: ProjectInfo) {
    if (this.isNew) {
      this.projInfoStore.dispatch(fromProjectInfoActions.AddNewProject({project: projectInfo}));
    } else {
      this.projInfoStore.dispatch(fromProjectInfoActions.editSelectedProject({project: projectInfo}));
    }

  }

  getVendorInfo(vendorTxt: string) {
    console.log('executing the getVendorInfo');
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadVendorAddressLoad(vendorTxt));

  }

  getPidInfo(pidNumber: string) {
    if (pidNumber) {
      this.projectForDDStore.dispatch(new fromProjectForDDAction.WarehouseDetailLoad(+pidNumber));
    }
  }

  loadDropDowns() {
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadProjectStatus);
    this.projectForDDStore.dispatch(new fromProjectForDDAction.LoadProjectTypes);
    this.agencyStore.dispatch(new fromAgencyAction.LoadAgencyAction);
  }

}
