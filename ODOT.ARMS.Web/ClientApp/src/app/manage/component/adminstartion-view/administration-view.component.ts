import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, NgForm } from '@angular/forms'
import { Store, select, props } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { State, process, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import * as fromAdministration from '../../state/reducers/';
import * as fromAdministrationReducer from '../../state/reducers/administration-categories';
import * as administrationActions from '../../state/actions/administration-categories';
import * as specificlistActions from '../../state/actions/specificlist';
import * as fundingTypeActions from '../../state/actions/fundingtype';
import { AdministrationCategory, SpecificListAdministration, FundingTypeListAdministration, SpecificListAdministrationRaw } from '../../models';
import { addAdministrationCategoryAction, editAdministrationCategoryAction } from '../../state/actions/administration-categories';
import { Update } from '@ngrx/entity';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { RowClassArgs, GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-adminstartion-view',
  templateUrl: './administration-view.component.html',
  styleUrls: ['./administration-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class AdministrationViewComponent implements OnInit {
  public multiple = false;
  public activeTabText: string = "Administration";
  fundingTypeListDetail$: Observable<FundingTypeListAdministration[]>;
  specificListDetail$: Observable<SpecificListAdministration[]>;
  agencyCategoryDetail$: AdministrationCategory[];
  public selectedFunding: { fundingTypeTxt: string, fundingTypeId: string };
  public selectedFundingChild: { fundingTypeTxt: string, fundingTypeId: string };
  administrationCategoryID: string;
  administrationCategoryText: string;
  specificListID: string;
  specificListText: string;
  specificListActive: string;
  public selectedSpecificItem: { specificListText: string, specificListID: string, specificListActive: string } = { specificListText: null, specificListID: null, specificListActive: null };
  public selectedSpecificItemChild: { specificListText: string, specificListID: string, specificListActive: string } = { specificListText: null, specificListID: null, specificListActive: null };
  public selectedPrimaryItems: {
    administrationCategoryID: number
  }


  public projectList: Array<SpecificListAdministration>;
  public fundingTypeList: Array<FundingTypeListAdministration>;
  public fundingSpecifictypes: Array<SpecificListAdministration> = [];
  public fundingTypeListChild: Array<FundingTypeListAdministration> = [];
  public fundingSpecifictypeChild: Array<SpecificListAdministration> = [];
  public primaryTypeList: Array<AdministrationCategory>;
  public administrationCategoryList: Array<AdministrationCategory>;
  administrationForm: FormGroup;
  noticationForm: FormGroup;
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public listItems: Array<{ text: string, value: string }> = [
    { text: "Active", value: "A" },
    { text: "Inactive", value: "I" },
  ];

  public sort: SortDescriptor[] = [{
    //field: 'activeind',
    field: 'administrationCategoryText',
    dir: 'asc'
  }];
  EditAdministrationDialogOpened: boolean;
  isNew: boolean;
  administrationAddEditForm: any;
  administrationCatTex: any;
  specificID: any;
  isSaveButtonDisabled: boolean;
  hiddenColumnChild: boolean;
  SecondaryColumnText: any;
  DeleteAdministrationDialogOpened: boolean;
  itemToRemove: string;
  submitted: boolean;
  hiddenColumns: boolean;
  gridView: AdministrationCategory[];
  public onStateChange(state: State) {
    this.gridState = state;
  }
  public gridData: any[];
  public primaryEvents: any[];
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder, private store$: Store<fromAdministration.State>, private notificationService: kendonotificationservice) {
    this.administrationForm = this.fb.group({
      administrationCategoryID: [''],
      administrationCategoryText: ['', Validators.required],
      controllingBoardApprvl: [''],
      activeind: ['', Validators.required],
      //specificListID: ['', Validators.required],
      specificListID: [''],
      administrationCategoryActive: true,
      primaryTypeId: [''],
    });
    this.gridData = [];
  }

  ngOnInit() {
    this.store$.dispatch(administrationActions.loadadministrationCategories());
    this.store$.dispatch(new specificlistActions.Load());
    this.store$.dispatch(new fundingTypeActions.Load());
    this.fundingTypeListDetail$ = this.store$.pipe(select(fromAdministration.getAllFundingTypeList));
    this.specificListDetail$ = this.store$.pipe(select(fromAdministration.getAllSpecificList));
    this.store$.pipe(select(fromAdministrationReducer.getAllAdministrationCategory)).subscribe(data => {
      this.agencyCategoryDetail$ = data;
      this.primaryTypeList = data.filter(e => e.specificListID == "18");
    });
    this.fundingTypeListDetail$.subscribe(data => {
      this.fundingTypeList = data;
      this.fundingTypeListChild = data;
      console.log("fundingTypeListDetail$" + JSON.stringify(data));
    });
    this.specificID = [''];
    this.isSaveButtonDisabled = false;
  }
  changeFunding(value) {
    this.gridView = [];
    this.selectedSpecificItem = undefined;
    this.SecondaryColumnText = "Select Specific List";
    this.administrationCategoryList = [];
    this.administrationForm.patchValue({
      selectedAddressCodeValue: ['']
    });
    this.selectedFunding = value;
    this.specificListDetail$.subscribe(data => {
      (this.fundingSpecifictypes = data.filter(e => e.fundingTypeID == value.fundingTypeId));
    });
  }
  changeFundingChild(value) {
    this.fundingSpecifictypeChild = [];
    this.selectedSpecificItemChild = { specificListText: null, specificListID: null, specificListActive: null };
    this.selectedPrimaryItems = {
      administrationCategoryID: null
    }
    this.specificListDetail$.subscribe(data => {
      (this.fundingSpecifictypeChild = data.filter(e => e.fundingTypeID == value.fundingTypeId));
    });
  }
  public changeSpecificChild(value) {
    this.administrationForm.patchValue({
      specificListID: this.selectedSpecificItemChild.specificListID
    });
  }
  changeProject(value) {
    if (value != undefined) {
      this.gridView = [];
      this.administrationCategoryList = [];
      //this.selectedSpecificItem = value;
      console.info(this.selectedSpecificItem);
      this.SecondaryColumnText = value.specificListText;
      if (this.agencyCategoryDetail$.length > 0) {
        this.administrationCategoryList = this.agencyCategoryDetail$.filter(e => e.specificListID == value.specificListID);
        this.gridView = this.administrationCategoryList;
        if (value.specificListText === "Secondary Events") {
          this.hiddenColumns = true;
          this.multiple = true;
          this.sort = [{
            field: 'primaryTypeId',
            dir: 'desc'
          }, {
            field: 'administrationCategoryText',
            dir: 'asc'
          }]
        } else {
          this.hiddenColumns = false;
          this.multiple = false;
          this.sort = [{
            field: 'administrationCategoryText',
            dir: 'asc'
          }]
        }
      }
      else {
        this.administrationCategoryList = [];
        this.gridView = [];
      }
    }
  }

  public chkSpecificItem() {

    if (!this.selectedSpecificItem || !this.selectedSpecificItem.specificListID)
      return true;
    return false;
  }


  public onAddAdministrationClick() {
    this.isNew = true;
    this.submitted = false;
    this.hiddenColumnChild = false;
    this.selectedFundingChild = { fundingTypeTxt: null, fundingTypeId: null };
    this.selectedSpecificItemChild = { specificListText: null, specificListID: null, specificListActive: null };
    this.selectedPrimaryItems = {
      administrationCategoryID: null
    }
    this.EditAdministrationDialogOpened = true;
    this.administrationForm.reset();
    this.administrationForm.patchValue({
      controllingBoardApprvl: 'N',
      activeind: 'A',
      administrationCategoryActive: true
    });
  }
  public saveEditedAdministrationCategory() {

    this.submitted = true;
    if (this.administrationForm.invalid) {
      return;
    }
    //if (this.administrationForm.invalid || this.selectedSpecificItemChild.specificListID == null) {
    //  return;
    //}
    this.EditAdministrationDialogOpened = false;
    if (this.isNew) {
      this.AddAdministrationCategory();
    }
    else {
      console.info(this.selectedSpecificItemChild.specificListID);
      this.administrationForm.patchValue({

        primaryTypeId: this.selectedSpecificItemChild.specificListID == "18" ? null : this.selectedPrimaryItems.administrationCategoryID
      });
      this.EditAdministrationCategory();
    }
  }
  public AddAdministrationCategory() {
    console.info('Add Category');
    //if (this.administrationForm.dirty) {
    if (this.administrationForm.dirty && this.administrationForm.valid) {
      let addadministrationCategory: AdministrationCategory;
      console.info('Funding Type ID ' + this.selectedFunding.fundingTypeId);
      console.info('Funding Type TXT ' + this.selectedFunding.fundingTypeTxt);
      console.info('Cat ID' + this.selectedSpecificItem.specificListID);
      //console.info('Cat TXT' + this.selectedFunding.fundingTypeTxt);

      addadministrationCategory = {
        administrationCategoryID: null,//this.selectedFunding.fundingTypeId,//this.administrationForm.value.administrationCategoryID,//selectedFunding.fundingTypeTxt
        administrationCategoryText: this.administrationForm.value.administrationCategoryText,//selectedFunding.fundingTypeId
        controllingBoardApprvl: this.administrationForm.value.controllingBoardApprvl,//Not Used
        activeind: "A",
        specificListID: this.selectedSpecificItem.specificListID,//this.selectedSpecificItemChild.specificListID,
        administrationCategoryActive: Boolean(this.administrationForm.value.administrationCategoryActive),//Not Used
        primaryTypeId: this.administrationForm.value.primaryTypeId//Not used
      };
      this.store$.dispatch(addAdministrationCategoryAction({ addadministrationCategory }));
      this.changeProject(this.selectedSpecificItem);
      this.notificationService.showSuccess('Administration Category  - ' + this.administrationForm.value.administrationCategoryText + ' added Successfully!');
    }
  }
  public EditAdministrationCategory() {
    const updateAdministrationCategory: Update<AdministrationCategory> = {
      id: this.administrationForm.value.administrationCategoryID,
      changes: {
        ...this.administrationForm.value,
      }
    };
    if (this.administrationForm.valid) {
      this.store$.dispatch(editAdministrationCategoryAction({ updateAdministrationCategory }));
      this.changeProject(this.selectedSpecificItem);
      this.notificationService.showSuccess('Administration Category - ' + this.administrationForm.value.administrationCategoryText + ' updated Successfully!');
    }
  }
  public EditAdministrationForm(obj: any) {
    this.isNew = false;
    this.EditAdministrationDialogOpened = true;
    this.selectedFundingChild = this.selectedFunding;
    this.selectedSpecificItemChild = this.selectedSpecificItem;
    this.PopulateData(obj);
    this.selectedPrimaryItems = {
      administrationCategoryID: Number(Object(obj)['primaryTypeId'])
    };
    this.specificListDetail$.subscribe(data => {
      if (data.length > 0)
        (this.fundingSpecifictypeChild = data.filter(e => e.fundingTypeID == parseInt(this.selectedFundingChild.fundingTypeId)));
    });
  }
  public PopulateData(obj: any) {
    this.administrationForm.patchValue({
      administrationCategoryText: String(Object(obj)['administrationCategoryText']),
      administrationCategoryActive: Boolean(Object(obj)['administrationCategoryActive']),
      administrationCategoryID: String(Object(obj)['administrationCategoryID']),
      controllingBoardApprvl: 'N',
      activeind: String(Object(obj)['activeind']) === "undefined" ? 'A' : String(Object(obj)['activeind']),
      specificListID: String(Object(obj)['specificListID']),
      primaryTypeId: String(Object(obj)['primaryTypeId']) == "null" ? null : Number(Object(obj)['primaryTypeId'])
    });
  }
  public DeleteAdministrationForm(obj: any) {
    this.DeleteAdministrationDialogOpened = true;
    this.PopulateData(obj);
    this.itemToRemove = String(Object(obj)['administrationCategoryText']);
  }

  public onDeleteAdministrationClick() {
    this.DeleteAdministrationDialogOpened = false;
    this.administrationForm.patchValue({
      activeind: "I",
      administrationCategoryActive: false
    });
    this.EditAdministrationCategory();
  }
  public DeleteAdministrationDialogClose(value: string) {
    this.DeleteAdministrationDialogOpened = false;
  }
  onSubmit() {
    console.log(JSON.stringify(this.administrationForm.value))
  }
  public changePrimaryChild(event) {
    this.administrationForm.patchValue({
      primaryTypeId: this.selectedPrimaryItems.administrationCategoryID
    });
  }

  onSubmitNofication() {
    console.log("TEST")
  }
  public EditAdministrationClose() {
    this.EditAdministrationDialogOpened = false;
  }


  public getTextById(Id: string) {
    if (Id != null) {
      var result = this.primaryTypeList.find(e => e.administrationCategoryID === Id);
      if (result) {
        return this.primaryTypeList.find(e => e.administrationCategoryID === Id).administrationCategoryText;
      }
      return "";
    }
  }
  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.load();
  }
  public grid_View: GridDataResult;
  private load(): void {
    this.grid_View = {
      data: orderBy(this.administrationCategoryList, this.sort),
      total: this.administrationCategoryList.length
    };
  }

  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.activeind != 'A') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }
}

