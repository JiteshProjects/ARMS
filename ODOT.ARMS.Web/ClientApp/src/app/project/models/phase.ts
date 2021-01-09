import { LookupItem } from "../../shared/models/lookup-item";

export class Phase {
  phaseId: string;
  projId: string;
  phaseNum: number;
  beginDate: Date;
  endDate: Date;
  amount: number;
  userId: string;
  entryDate: Date;
  activeInd: string;
  phaseTitle: string;
  mergeInd: string;
  mergePhaseId: string;
  isUpdated: string;
  isOld: boolean;
  statusId: string;


  public static buildPhaseLookupList(phaseList: Phase[]) {
    if (!phaseList || phaseList.length === 0) return;
    let phasePrefix: string = "Merged Phase - ";
    let phaseLookupList: LookupItem[] = [];

    var phaseTxt = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    if (phaseTxt != '') {
      var phaseId = phaseList.find((item) => item.mergeInd === 'M').mergePhaseId;
      phaseLookupList.push({ value: phaseId, text: phasePrefix + phaseTxt });
    }

    for (let i = 0; i < phaseList.length; i++) {
      if (phaseList[i].mergePhaseId === null) {
        phaseLookupList.push({ value: phaseList[i].phaseId, text: "Phase - " + phaseList[i].phaseNum });
      }
    }
    return phaseLookupList;
  }

  public static buildGridPhaseLookupList(phaseList: Phase[]) {
    if (!phaseList || phaseList.length === 0) return;
    let phasePrefix: string = "Merged Phase - ";
    let phaseLookupList: LookupItem[] = [];
    var MergeId = null;

    var phaseTxt = phaseList.filter(item => item.mergeInd === 'M').sort(this.compare).map(e => e.phaseNum).join(',');
    for (let item of phaseList) {
      if (item.mergeInd === 'M') {
        phaseLookupList.push({ value: item.phaseId, text: phasePrefix + phaseTxt });
        if (MergeId === null)
          MergeId = item.mergePhaseId;
      }
      else {
        phaseLookupList.push({ value: item.phaseId, text: "Phase - " + item.phaseNum });
      }
    }
    if (MergeId)
      phaseLookupList.push({ value: MergeId, text: phasePrefix + phaseTxt });

    return phaseLookupList;
  }

  private static compare(a, b) {
    const bandA = a.phaseNum;
    const bandB = b.phaseNum;

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

}
