export interface IEventUpload {
  eventUploadId: string,
  eventSrc: string,
  documentName: string,
  fileSize: number,
  privateInd: string,
  activeInd: string,
  userId: string,
  uploadDate: Date,
  extension: string,
}
export class EventUpload implements IEventUpload {
  eventUploadId: string;
  eventSrc: string;
  documentName: string;
  fileSize: number;
  privateInd: string;
  activeInd: string;
  userId: string;
  uploadDate: Date;
  extension: string;
}
export interface IEvents {
  eventSrc: string,
  phaseTxt: string,
  primaryTypeId: number,
  primaryTypeTxt: string,
  secondaryTypeId: number,
  secondaryTypeTxt: string,
  invoiceNumber: string,
  publicCommentTxt: string,
  privateCommentTxt: string,
  userId: string,
  beginDate: Date,
  endDate: Date,
  activeIndTxt: string,
  activeInd: string,
  eventId: string,
  document: string,
  eventUploadForDD: Array<EventUpload>,
  files: Array<File>
}
export class EventsRaw implements IEvents {
  eventSrc: string;
  phaseTxt: string;
  primaryTypeId: number;
  primaryTypeTxt: string;
  secondaryTypeId: number;
  secondaryTypeTxt: string;
  invoiceNumber: string;
  publicCommentTxt: string;
  privateCommentTxt: string;
  userId: string;
  beginDate: Date;
  endDate: Date;
  activeIndTxt: string;
  activeInd: string;
  eventId: string;
  document: string;
  projectId: string;
  eventUploadForDD: Array<EventUpload>;
  files: Array<File>
}


