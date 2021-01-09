import { Component, OnInit } from '@angular/core';
import { UploadEvent, FileInfo } from '@progress/kendo-angular-upload';
import { fileservice } from '../../../shared/services/files.services';

@Component({
  selector: 'app-financial-funding',
  templateUrl: './financial-funding.component.html',
  styles: [
  ],
})
export class FinancialFundingComponent implements OnInit {
 // public activeTabText: string = "Funding";
  AddEditDialogOpened: boolean;
  gridFundingData: any;
  phaseItems: string[];
  fundingData: { 'fundingType': string; 'fiscalYear': string; 'fundingsource': string; 'amount': string; 'encumbrance': string; }[];
  public myFiles: Array<FileInfo>;
  constructor(public fielserviceExt: fileservice) { }

  ngOnInit(): void {
    this.fundingData = [
      {
        'fundingType': 'Encumbrance',
        'fiscalYear': '',
        'fundingsource': '',
        'amount': '',
        'encumbrance': ''
      },
      {
        'fundingType': 'Encumbrance',
        'fiscalYear': '',
        'fundingsource': '',
        'amount': '',
        'encumbrance': ''
      },
      {
        'fundingType': 'Encumbrance',
        'fiscalYear': '',
        'fundingsource': '',
        'amount': '',
        'encumbrance': ''
      },
    ];
    this.phaseItems = ["Phase 1", "Phase 2", "Phase 3"];
    this.gridFundingData = this.fundingData
  }
  public AddEditDialogClose() {
    this.AddEditDialogOpened = false;
  }
  public onAddClick(event) {
    this.AddEditDialogOpened = true;
  }
  uploadEventHandler(e: UploadEvent) {
  }
  public getIconFilePath(fileExtension: string): string {
    return this.fielserviceExt.GetFileByExtension(fileExtension);
  }

  public remove(upload, uid: string) {
    upload.removeFilesByUid(uid);
  }
  public getChecked(uid) {
  }
}
