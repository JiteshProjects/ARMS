import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { EventRaw } from '../../models/event-raw';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Phase } from '../../models/phase';
import { LookupItem } from '../../../shared/models/lookup-item';

@Component({
  selector: 'app-prj-events-list',
  templateUrl: './prj-events-list.component.html',
  styles: [
  ]
})
export class PrjEventsListComponent implements OnInit {

  private phaseLookupList: LookupItem[] = [];

  @Input() events: EventRaw[] = [];
  @Input() phaseList: Phase[];
  @Input() primaryEvents: LookupItem[];
  @Input() secondaryEvents: LookupItem[];
  @Input() eventStatuses: LookupItem[];
  @Output() selectEvent = new EventEmitter<EventRaw>();
  @Output() selectEventUpload = new EventEmitter<EventRaw>();//test to be removed

  public sort: SortDescriptor[] = [{
    field: 'phaseNum',
    dir: 'asc'
  }];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['phaseList']) {
      this.phaseLookupList = Phase.buildGridPhaseLookupList(this.phaseList);
      
    }
   // console.info('event list - on changes');
   // console.info(this.phaseLookupList);
  }


  public rowCallback = (context: RowClassArgs) => {
    if ((context.dataItem.activeInd === 'I') || (context.dataItem.activeInd === 'C')) {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public getPhaseDescription(id: any): string {
    return LookupItem.getTxtById(id, this.phaseLookupList);
  }
  public getPrimaryEventDescription(id: any): string {
    return LookupItem.getTxtById(id, this.primaryEvents);
  }
  public getSecondaryEventDescription(id: any): string {
    return LookupItem.getTxtById(id, this.secondaryEvents);
  }
  public getEventStatusDescription(id: any): string {
    return LookupItem.getTxtById(id, this.eventStatuses);
  }

  public formatDocCnt(cnt: number): string {
    if (cnt) {
      return cnt + ' Docs';
    }
    else { 
      return '0 Docs';
    }
  }

}
