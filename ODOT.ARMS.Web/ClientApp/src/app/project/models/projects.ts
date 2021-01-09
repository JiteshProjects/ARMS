import { AdministrationCategoryRaw } from '../../manage/models';
import { IGenericLookupListForDD } from './project-for-update';

export interface IPersonnel {
  personnelId: string;
  RoleID: string;
  PhaseID: string;
  ContactID: string;
  isLeadInd: string;
  ActiveInd: string;
  UserId: string;
  Entry_date: Date;
  ContactName: string;
  AgencyName: string;
  EmailAddress: string;
  MobilePhone: string;
  Role: string;
}

export class PersonnelRaw implements IPersonnel {

    public personnelId: string;
    public RoleID: string;
    public PhaseID: string;
    public ContactID: string;
    public isLeadInd: string;
    public ActiveInd: string;
    public UserId: string;
    public Entry_date: Date;
    public ContactName: string;
    public AgencyName: string;
    public EmailAddress: string;
    public MobilePhone: string;
    public Role: string;
}

export interface Item {
  text: string;
  value: string;
}

export interface PrjID {
  text: string;
}

/*
export interface ContactInfo {
  contactName: string;
  RoleInfo: string;
}
*/

export interface IProjectType {
  projectTypeId: number;
  projectId: string;
  userId: string;
  entryDate: Date;
}

export class ProjectType implements IProjectType {
  public projectTypeId: number;
  public projectId: string;
  public userId: string;
  public entryDate: Date;
}

export interface IPhase {
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
}
export class PhaseRaw implements IPhase {
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
}
export class PassProjectData {
  projectAltId: number;
  rfpNumber: string;
  projectTypeId: string;
  projectType: string;
  prjId: string;
}

// **********************Project**************************************///

export interface IProject {
  projectAltId: number;
  projectClassificationId: number;
  projectStatusId: number;
  projectStatusTxt: string;
  projectTitleTxt: string;
  rfpNum: string;
  ideaNum: string;
  fedAuthNum: string;
  stateJobNum: string;
  agreementNum: string;
  pidNum: string;
  propFiscalYr: string;
  tpfNum: string;
  contractStartDt: Date;
  contractEndDt: Date;
  agencyId: number;
  agencyName: string;
  vendorIdTxt: string;
  addressCd: string;
  impStatusInd: string;
  standardDeliverableInd: string;
  projectDuration: number;
  currentEndDt: Date;
  summaryTxt: string;
  goalsTxt: string;
  activeInd: string;
  projId: string;
  userId: string;
  entryDt: Date;
  objectiveTxt: string;
  projectTypeList: Array<IGenericLookupListForDD>;
  phaseList: Array<IPhase>;
  // eventList: Array<IEvent>;
}
export class Project implements IProject {
  projectAltId: number;
  projectClassificationId: number;
  projectStatusId: number;
  projectStatusTxt: string;
  projectTitleTxt: string;
  rfpNum: string;
  ideaNum: string;
  fedAuthNum: string;
  stateJobNum: string;
  agreementNum: string;
  pidNum: string;
  propFiscalYr: string;
  tpfNum: string;
  contractStartDt: Date;
  contractEndDt: Date;
  agencyId: number;
  agencyName: string;
  vendorIdTxt: string;
  addressCd: string;
  impStatusInd: string;
  standardDeliverableInd: string;
  projectDuration: number;
  currentEndDt: Date;
  summaryTxt: string;
  goalsTxt: string;
  activeInd: string;
  projId: string;
  userId: string;
  entryDt: Date;
  objectiveTxt: string;
  projectTypeList: Array<IGenericLookupListForDD>;
  phaseList: Array<IPhase>;
  // eventList: Array<IEvent>;
}

export class ProjectForSearch {
  projectAltId: number;
  projectClassificationId: number;
  projectType: string;
  projectStatusId: number;
  projectStatusTxt: string;
  projectTitleTxt: string;
  rfpNum: string;
  pidNum: string;
  agencyName: string;
  projId: string;
  userId: string;
}


// **********************Project**************************************///
