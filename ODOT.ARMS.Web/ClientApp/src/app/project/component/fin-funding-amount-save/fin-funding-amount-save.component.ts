import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectInfo } from "../../models/projectInfo";


@Component({
  selector: 'app-fin-funding-amount-save',
  templateUrl: './fin-funding-amount-save.component.html'
})
export class FinFundingAmountSaveComponent implements OnInit {
 
  constructor(private fb: FormBuilder) {
    this.prjInfoForm = this.fb.group({
      projectAltId: [''],
      projectClassificationId: [''],
      projectStatusId: [''],
      projectTitleTxt: ['', [Validators.required]],
      //  rfpNum: ['', [Validators.required], [this.rfpValidator.rfpNumberExists()]],
      rfpNum: ['', [Validators.required]],
      ideaNum: [''],
      fedAuthNum: [''],
      stateJobNum: [''],
      agreementNum: [''],
      pidNum: [''],
      propFiscalYr: ['', [Validators.required]],
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
      goalsTxt: [''],
      activeInd: [''],
      projId: [''],
      userId: [''],
      entryDt: new Date(),
      objectiveTxt: [''],
      projectTypeList: [null],
      projectTypeNbr: [''],
      withholdingAmount:['']
    });
  }
  @Input() projectInfo: ProjectInfo;
  public prjInfoForm: FormGroup;
  @Output() saveProjInfo = new EventEmitter<ProjectInfo>();
  ngOnInit() {
    debugger;
    this.prjInfoForm.patchValue(this.projectInfo);
  }
  

  save() {
    debugger;
    const withholdingAmount: number = this.prjInfoForm.value.withholdingAmount;
    this.prjInfoForm.patchValue(this.projectInfo);
    this.prjInfoForm.patchValue({
      withholdingAmount: withholdingAmount
    });
    this.prjInfoForm.markAsPristine();
    const prjInfo: ProjectInfo = this.prjInfoForm.value;
    this.saveProjInfo.emit(prjInfo);
  }


}
