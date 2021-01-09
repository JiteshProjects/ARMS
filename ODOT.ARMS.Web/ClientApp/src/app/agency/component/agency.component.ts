import { Component, OnInit, Inject, ViewChild, ViewContainerRef, Input, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { GridDataResult, DataBindingDirective, DataStateChangeEvent, RowClassArgs } from '@progress/kendo-angular-grid';
import { AgencyDetailModel, IAgencyDetail, AdministrationCategory} from '../models/agencydetails.module';
/* Ngrx */
import { Store, select } from '@ngrx/store';
import * as fromAgencyreducer from '../state/reducers/agencies.reducer'; /* getting the entire state and properties from reducer */
import * as fromAgencyAction from '../state/actions/agency.actions';
import { AgencyDataService } from '../services/agencyinfo.service';
import { Observable, timer } from 'rxjs';
import { process, State, SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { kendonotificationservice } from '../../shared/services/kendo-notification.service';
import { switchMap, map } from 'rxjs/operators';



@Component({
  selector: 'app-agency-information',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {
  public view: Observable<GridDataResult>;
  @ViewChild(DataBindingDirective) dataBinding: DataBindingDirective;
  @ViewChild('searchBox') searchBox: ElementRef;

  public state: State = {
    sort: [],
    skip: 0,
    take: 10
  };
  public itemToRemove: any;

  public AgencyEditForm: FormGroup;
  public agencies: Array<AgencyDetailModel>;
  public agencyCategoryList: Array<AdministrationCategory>;
  public isNew: boolean;
  public editAgencyDialogOpen: boolean;
  public IntializeAgency: AgencyDetailModel;
  public gridData: any[];
  public gridView: any[];
  public defaultItem: { text: string, value: string } = { text: "Please Select Status", value: null };
  public defaultItemControllingBoard: { text: string, value: string } = { text: "Please Select Controlling Board", value: null };
  public defaultItem1: AdministrationCategory = { administrationCategoryText: "Please Select Category", administrationCategoryID: null, controllingBoardApprvl: null, aCTIVEIND: null, specificListID: null, administrationCategoryActive: null };
  public selectedCatValue: AdministrationCategory;
  public IsError: number;
  public submitted: boolean;
  public oldValue: string;



  public formatOptions: any = {
    maximumFractionDigits: 0,
    useGrouping: false
  };

  constructor(private fb: FormBuilder, private store: Store<fromAgencyreducer.State>,
    private dataservice: AgencyDataService, private formBuilder: FormBuilder, private notificationService: kendonotificationservice) {
    this.createFormGroup = this.createFormGroup.bind(this);
    this.AgencyEditForm = this.fb.group({
      agencyId: [''],
      agencyNameTxt: ['', [Validators.required, this.noWhitespaceValidator]],
      agencyCatText: [''],
      agencyCatId: [''],
      agencyStatusInd: ['', Validators.required],
      controlBoardApprvlInd: [''],
      activeInd: [''],
      userId: [''],
      entryDt: new Date(),
      vendorId: ['', Validators.compose([Validators.required]), this.vendorvalidator()],
      //vendorId: ['', [Validators.required, this.noWhitespaceValidator]]


    });

    //this.createSearchFormGroup = this.createSearchFormGroup.bind(this);
    //this.clearSearch = new FormGroup({
    //  searchTxt: new FormControl('')
      //});
  }

  // convenience getter for easy access to form fields
  get f() { return this.AgencyEditForm.controls; }

  public EditAgencyDialogOpened = false;
  public DeleteAgencyDialogOpened = false;
  public createFormGroup(args: any): any {
    const item = args.isNew ? this.IntializeAgency : args.dataItem;
    console.info(item.vendorId);
    const formGroup = this.formBuilder.group({
      'agencyId': item.agencyId,
      'agencyNameTxt': item.agencyNameTxt,
      'agencyCatText': item.agencyCatText,
      'agencyCatId': item.agencyCatId,
      'agencyStatusInd': item.agencyStatusInd,
      'controlBoardApprvlInd': item.controlBoardApprvlInd,
      'activeInd': item.activeInd,
      'userId': item.userId,
      'entryDt': item.entryDt,
      'vendorId': parseInt(item.vendorId, 0)
    });

    return formGroup;
  }


  ngOnInit() {

    this.loadAgencies();
  }
  
  public getValues() {
    this.gridData = this.agencies;
  }

  public loadAgencies() {
    this.store.dispatch(new fromAgencyAction.LoadAgencyAction());
    this.store.pipe(select(fromAgencyreducer.getAgencyReducer)).subscribe(
      agencies => {
        (this.agencies = agencies);
        console.log('Agencies array' + JSON.stringify(this.agencies));
        this.getValues();
        this.gridView = this.gridData;
      });
    this.store.dispatch(new fromAgencyAction.Load());
    this.store.pipe(select(fromAgencyreducer.getAgencyCategoryReducer)).subscribe(
      agencyCategoryList => {
        (this.agencyCategoryList = agencyCategoryList);

      });
  }

  //start----region for edit agency
  public EditAgencyDialogClose(value: string) {
    this.AgencyEditForm.reset();
    this.AgencyEditForm.controls['vendorId'].setErrors(null);
    this.EditAgencyDialogOpened = false;
    console.log(value);
  }

  public onEditAgencyClick() {
    this.EditAgencyDialogOpened = true;
    console.log('Edit Agency button clicked');
  }

  public EditAgencyForm(obj: any) {
    this.isNew = false;
    this.onEditAgencyClick();
    console.log(obj);
    this.displayEditAgencyForm(obj);
  }

  public displayEditAgencyForm(obj: any) {
    console.info('a');
    this.AgencyEditForm.patchValue({
      agencyId: String(Object(obj)['agencyId']),
      agencyNameTxt: String(Object(obj)['agencyNameTxt']),
      agencyCatText: String(Object(obj)['agencyCatText']),
      agencyCatId: String(Object(obj)['agencyCatId']),
      agencyStatusInd: String(Object(obj)['agencyStatusInd']),
      controlBoardApprvlInd: String(Object(obj)['controlBoardApprvlInd']),
      userId: String(Object(obj)['userId']),
      //vendorId: String(Object(obj)['vendorId']),
      vendorId: parseInt(String(Object(obj)['vendorId']), 0 ),
      entryDt: new Date(String((Object(obj)['entryDt'])))
    });
    this.selectedCatValue = { administrationCategoryText: String(Object(obj)['agencyCatText']), administrationCategoryID: String(Object(obj)['agencyCatId']), controllingBoardApprvl: String(Object(obj)['controlBoardApprvlInd']), aCTIVEIND: null, specificListID: null, administrationCategoryActive: null };
    this.oldValue = String(Object(obj)['vendorId']);
  }

  public saveEditedAgency() {
    this.AgencyEditForm.patchValue({
      agencyCatText: this.selectedCatValue.administrationCategoryText,
      agencyCatId: this.selectedCatValue.administrationCategoryID,
      controlBoardApprvlInd: this.selectedCatValue.controllingBoardApprvl
    });
    this.AgencyEditForm.markAsDirty();
    // stop here if form is invalid
    this.submitted = true;
    if (this.AgencyEditForm.invalid || this.selectedCatValue.administrationCategoryID == null) {
      return;
    }
    this.EditAgencyDialogOpened = false;
    if (this.isNew) {
      this.AddNewAgency();
    }
    else {
      this.EditAgency();
    }

  }

  public EditAgency() {
    if (this.AgencyEditForm.dirty && this.AgencyEditForm.valid) {
      this.store.dispatch(new fromAgencyAction.EditAgencyAction(this.AgencyEditForm.value));
      this.notificationService.showSuccess('Agency - ' + this.AgencyEditForm.value.agencyNameTxt + ' updated Successfully!');
    }
  }

  public AddNewAgency() {
    if (this.AgencyEditForm.dirty && this.AgencyEditForm.valid) {
      this.store.dispatch(new fromAgencyAction.AddAgencyAction(this.AgencyEditForm.value));
      this.notificationService.showSuccess('Agency - ' + this.AgencyEditForm.value.agencyNameTxt + ' added Successfully!');
    }
  }

  //End----region for for edit agency

  //Start: region for add agency

  public onAgencyAddClick() {
    this.isNew = true;
    this.EditAgencyDialogOpened = true;
    this.store.dispatch(new fromAgencyAction.InitializeCurrentAgency(this.IntializeAgency));
    this.selectedCatValue = { administrationCategoryText: null, administrationCategoryID: null, controllingBoardApprvl: null, aCTIVEIND: null, specificListID: null, administrationCategoryActive: null };
    this.AgencyEditForm.reset();
    this.submitted = false;
    this.AgencyEditForm.patchValue({
      controlBoardApprvlInd: "Y",
      agencyStatusInd: "A"
    });
    this.oldValue = null;
    this.AgencyEditForm.controls['vendorId'].setErrors(null);

  }

  //End: region for add agency

  public listItems: Array<{ text: string, value: string }> = [
    { text: "Active", value: "A" },
    { text: "InActive", value: "I" },
  ];

  public listControllingItems: Array<{ text: string, value: string }> = [
    { text: "Yes", value: "Y" },
    { text: "No", value: "N" },
  ];

  //Start: Method for deleting the agencies

  public DeleteAgencyForm(obj: any) {
    this.DeleteAgencyDialogOpened = true;
    this.displayEditAgencyForm(obj);
    this.itemToRemove = String(Object(obj)['agencyNameTxt']);
  }

  public onDeleteAgencyClick() {
    this.DeleteAgencyDialogOpened = false;
    this.AgencyEditForm.patchValue({
      activeInd: "I",
      agencyStatusInd: "I"
    });

    this.store.dispatch(new fromAgencyAction.EditAgencyAction(this.AgencyEditForm.value));
    //this.toastr.success('Agency - ' + this.AgencyEditForm.value.agencyNameTxt + ' Deleted Successfully!');
    this.notificationService.showSuccess('Agency - ' + this.AgencyEditForm.value.agencyNameTxt + ' Deleted Successfully!');

  }

  public DeleteAgencyDialogClose(value: string) {
    this.DeleteAgencyDialogOpened = false;
  }
  //End: Method for deleting the agencies

  public dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    //this.gridData = process(this.agencies, this.state);
  }
  public onFilter(inputValue: string): void {

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'agencyNameTxt',
            operator: 'contains',
            value: inputValue
          },
          {
            field: 'agencyCatText',
            operator: 'contains',
            value: inputValue
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }

  public onContactClickAF(): void {

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'A'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'B'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'C'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'D'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'E'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'F'
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;
  }
  public onContactClickGL(): void {

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'G'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'H'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'I'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'J'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'K'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'L'
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;

  }
  public onContactClickMR(): void {

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'M'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'N'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'O'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'P'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'Q'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'R'
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;

  }
  public onContactClickSZ(): void {
    this.gridView = process(this.gridData, {
      filter: {
        logic: 'or',
        filters: [
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'S'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'T'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'U'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'V'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'W'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'X'
          }
          ,
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'Y'
          },
          {
            field: 'agencyNameTxt',
            operator: 'startswith',
            value: 'Z'
          }
        ],
      }
    }).data;
    this.dataBinding.skip = 0;

  }

  public onClear(): void {

    this.searchBox.nativeElement.value = '';

    this.gridView = process(this.gridData, {
      filter: {
        logic: 'and',
        filters: [],
      }
    }).data;
    this.dataBinding.skip = 0;
    
    
  }

  public multiple = false;
  public allowUnsort = true;
  public sort: SortDescriptor[] = [{
    field: 'agencyStatusInd',
    dir: 'asc'
  }];

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.load();
  }
  public grid_View: GridDataResult;
  private load(): void {
    this.grid_View = {
      data: orderBy(this.agencies, this.sort),
      total: this.agencies.length
    };
  }

  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.agencyStatusInd === 'I') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

 public vendorvalidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchVendorId(control.value)
        .pipe(
          map(res => {
            if (res != '~') {
              // return error
              console.log(res);
              return { 'vendorIdExists': true };
            }
          })
        );
    };

  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  public searchVendorId(text) {
    return timer(1)
      .pipe(
        switchMap(() => {

          var result;

          if (!this.isNew) {
            if (this.oldValue != text) {
               result = this.agencies.find(function (item) {
                return (item.vendorId) == (text);
              });
            }
            else {
               result = '&';
            }
          }
          else {
             result = this.agencies.find(function (item) {
              return (item.vendorId) == (text);
            });
          }

          var resu = result && result.vendorId || '~';
          return resu;
        })

      );
  }
}
