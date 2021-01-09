import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { GridDataResult, RowClassArgs } from "@progress/kendo-angular-grid";

import { orderBy, SortDescriptor } from "@progress/kendo-data-query";
import { LookupItem } from "src/app/shared/models/lookup-item";
import { GenericLookupListForDD } from "../../models/project-for-update";
import { PhaseRaw } from "../../models/projects";



@Component({
  selector: 'app-prj-phase-list',
  templateUrl: './prj-phases-list.component.html'
})
export class PrjPhaseListComponent implements OnInit, OnChanges {

  @Input() phaseStatusList: Array<GenericLookupListForDD>;
  @Input() phases: Array<PhaseRaw>;
  @Output() selectPhase = new EventEmitter<PhaseRaw>();
  @Output() mergePhase = new EventEmitter<PhaseRaw[]>();

  public phaseString: string = null;
  public mergePhaseSum: number = 0.00;
  public gridView: GridDataResult;
  public mergePhases: PhaseRaw[] = [];
  public sort: SortDescriptor[] = [{
    field: 'phaseNum',
    dir: 'asc'
  }];

  ngOnInit() {
    this.loadPhases()
    this.updateFooter();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('onchange', changes, this.phases);
    if (this.phases && this.phases?.length > 0) {
      this.mergePhases = [];
      this.loadPhases();
      this.updateFooter();
    }
      
  }

  private loadPhases(): void {
    if (this.phases) {
      this.gridView = {
        data: orderBy(this.phases, this.sort),
        total: this.phases.length
      };
    }
  }

  public updateFooter() {
    this.mergePhaseSum = this.gridView.data.filter(item => item.mergeInd === 'M').reduce((sum, current) => sum + current.amount, 0);
    this.phaseString = this.gridView.data.filter(item => item.mergeInd === 'M').map(e => e.phaseNum).join(',');
  }

  public handleMerge(row: PhaseRaw, event: any) {
    //return false;
    if(event.target.checked) {
      let phase = Object.assign({}, row);
      phase.mergeInd = 'M';
      this.mergePhases.push(phase);
    }
    else {
      let index = this.mergePhases.findIndex(x => x.phaseId == row.phaseId);
      if(index > -1) {
        this.mergePhases.splice(index, 1);
      }      
    }
    
    

  }

  public rowCallback = (context: RowClassArgs) => {
    if (context.dataItem.activeInd === 'I') {
      return {
        deleteEven: true,
        deleteOdd: true
      };
    }
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadPhases();
  }

  getStatusDescription(id: any) {
    return LookupItem.getTxtById(id, this.phaseStatusList);
  }

}
