import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { EventRaw } from '../../models/event-raw';
import { LookupItem } from '../../../shared/models/lookup-item';
import { MinDate, MaxDate, DateFormat, DateTimeFormat } from 'src/app/shared/models/constants';
import { Phase } from '../../models/phase';

@Component({
  selector: 'app-prj-event-save',
  templateUrl: './prj-event-save.component.html',
  styles: [
  ]
})
export class PrjEventSaveComponent implements OnInit, OnChanges {
  public eventForm: FormGroup;
  public  phaseLookupList: LookupItem[] = [];
  public  secondaryTypeItems: LookupItem[];
  // private phasePrefix: string = "Merged Phase - ";
  public maxChars = 255;

  @Input() event: EventRaw;
  @Input() phaseList: Phase[];
  @Input() primaryEvents: LookupItem[];
  @Input() secondaryEvents: LookupItem[];
  @Input() eventStatuses: LookupItem[];
  @Input() saveEventDialogStatus: boolean;
  @Output() setSaveEventDialogStatus = new EventEmitter<boolean>();
  @Output() saveEvent = new EventEmitter<EventRaw>();

  get minDate() { return MinDate; }
  public endMinDate: Date = new Date();
  get maxDate() { return MaxDate; }
  get dateFormat() { return DateFormat; }
  get dateTimeFormat() { return DateTimeFormat; }

  constructor(private fb: FormBuilder) { }

  get eventSrc(): FormControl { return this.eventForm.get('eventSrc') as FormControl; }
  get beginDate(): FormControl { return this.eventForm.get('beginDate') as FormControl; }
  get endDate(): FormControl { return this.eventForm.get('endDate') as FormControl; }
  get primaryTypeId(): FormControl { return this.eventForm.get('primaryTypeId') as FormControl; }
  get secondaryTypeId(): FormControl { return this.eventForm.get('secondaryTypeId') as FormControl; }
  get activeInd(): FormControl { return this.eventForm.get('activeInd') as FormControl; }
  get publicCommentTxt(): FormControl { return this.eventForm.get('publicCommentTxt') as FormControl; }
  get privateCommentTxt(): FormControl { return this.eventForm.get('privateCommentTxt') as FormControl; }
  get title(): string { return this.event ? 'Event - Add' : 'Event - Update'; }

  ngOnInit(): void {
    this.loadEvent();
  }  

  public loadEvent() {

    if (this.event) {
      this.handlePrimaryTypeChange(this.event.primaryTypeId);
      //this.eventForm.setValue(this.event);//Our issue
      this.eventForm = this.fb.group({
        eventId: [this.event.eventId],
        eventSrc: [this.event.eventSrc], // this is also the phase id for events created in this form
        primaryTypeId: [this.event.primaryTypeId],
        secondaryTypeId: [this.event.secondaryTypeId],
        publicCommentTxt: [this.event.publicCommentTxt],
        privateCommentTxt: [this.event.privateCommentTxt],
        beginDate: [this.event.beginDate],
        endDate: [this.event.endDate],
        activeInd: [this.event.activeInd]
      });
    }
    else {
      this.eventForm = this.fb.group({
        eventId: [null],
        eventSrc: [null], // this is also the phase id for events created in this form
        primaryTypeId: [null],
        secondaryTypeId: [null],
        publicCommentTxt: [''],
        privateCommentTxt: [''],
        beginDate: [null],
        endDate: [null],
        activeInd: ['A']
      });
    }
    this.eventSrc.markAsTouched();
    this.primaryTypeId.markAsTouched();
    this.publicCommentTxt.markAsTouched();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['phaseList']) {
      this.phaseLookupList = Phase.buildPhaseLookupList(this.phaseList);
    }
    // if (changes['event']) {
    this.loadEvent();
    // }
  }

  private setEndMin() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    this.endMinDate = date;
  }

  public onChangeEndDate(e) {
    this.endMinDate = e;
  }


  handlePrimaryTypeChange(primaryType) {
    if (this.secondaryEvents) {
      this.secondaryTypeItems = this.secondaryEvents.filter(item => item.primaryTypeId === primaryType).slice();
    }
  }

  public onSaveEvent(): void {
    const updatedEvent = Object.assign({}, this.event, automapper.map('EventFormModel', 'EventForUpdate', this.eventForm.value));
    this.saveEvent.emit(updatedEvent);
  }
}
