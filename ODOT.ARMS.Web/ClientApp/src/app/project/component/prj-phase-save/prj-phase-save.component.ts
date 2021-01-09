import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { SortDescriptor } from "@progress/kendo-data-query";
import { DateFormat, DateTimeFormat, MaxDate, MinDate } from "src/app/shared/models/constants";

import { GenericLookupListForDD } from "../../models/project-for-update";
import { PhaseRaw } from "../../models/projects";


@Component({
  selector: 'app-prj-phase-save',
  templateUrl: './prj-phase-save.component.html'
})
export class PrjPhaseSaveComponent implements OnInit, OnChanges {

  public phaseForm: FormGroup;
  @Input() phaseStatusList: Array<GenericLookupListForDD>;
  @Input() savePhaseDialogStatus: boolean;
  @Input() phase: PhaseRaw;
  @Input() phases: Array<PhaseRaw>;
  @Input() projectId: string;
  @Output() SortChangeEvent = new EventEmitter<SortDescriptor[]>();
  @Output() FormSave = new EventEmitter<any>();
  @Output() setSavePhaseDialogStatus = new EventEmitter<boolean>();
  @Output() savePhase = new EventEmitter<PhaseRaw>();

  get minDate() { return MinDate; }
  public endMinDate: Date = new Date();
  get maxDate() { return MaxDate; }
  get dateFormat() { return DateFormat; }
  get dateTimeFormat() { return DateTimeFormat; }
  public currencyMaxValue = 100000000;
  public endDt: Date;
  public beginDt: Date;

  constructor(private fb: FormBuilder) { }

  get projId(): FormControl { return this.phaseForm.get('projId') as FormControl; }
  get phaseNum(): FormControl { return this.phaseForm.get('phaseNum') as FormControl; }
  get phaseTitle(): FormControl { return this.phaseForm.get('phaseTitle') as FormControl; }
  get amount(): FormControl { return this.phaseForm.get('amount') as FormControl; }
  get beginDate(): FormControl { return this.phaseForm.get('beginDate') as FormControl; }
  get endDate(): FormControl { return this.phaseForm.get('endDate') as FormControl; }
  get statusId(): FormControl { return this.phaseForm.get('statusId') as FormControl; }


  ngOnInit() {
    this.loadPhase();
  }

  get title() {
    return true ? 'Phase – Add' : 'Phase – Edit'
  }

  private loadPhase() {
    if (this.phase) {
      this.phaseForm = this.fb.group({
        projId: [this.phase.projId],
        phaseNum: [this.phase.phaseNum],
        phaseTitle: [this.phase.phaseTitle],
        amount: [this.phase.amount],
        beginDate: [this.phase.beginDate],
        endDate: [this.phase.endDate],
        statusId: [this.phase.statusId]
      });
    }
    else {
      this.phaseForm = this.fb.group({
        projId: [this.projectId],
        phaseNum: [this.getMaxId()],
        phaseTitle: [null],
        amount: [null],
        beginDate: [null],
        endDate: [null],
        statusId: [null]
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ng on chnages', changes);
    this.loadPhase();
  }

  public getMaxId() {
    if (this.phases != null && this.phases.length > 0)
      return (Math.max.apply(Math, this.phases.map(function (o) { return o.phaseNum }))) + 1;
    else
      return 1;
  }

  public onSavePhase() {
    let updatedPhase = Object.assign({}, this.phase, automapper.map('PhaseFormModel', 'PhaseForUpdate', this.phaseForm.value));
    console.log('save', updatedPhase);
    this.savePhase.emit(updatedPhase);
  }

  public onChangeEndDate() { }


}
