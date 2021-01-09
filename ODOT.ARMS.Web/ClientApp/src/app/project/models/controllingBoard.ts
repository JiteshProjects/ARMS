import { EventUpload } from './events';

export interface IControllingBoard {
  controllingBoardId: string;
  projectId: string;
  controllingBoardNumber: string;
  controllingBoardType: number;
  controllingBoardStatus: number;
  publicCommentText: string;
  userId: string;
  entryDate: Date;
  activeInd: string;
  controllingBoardDate: Date;
  submissionDate: Date;
  controllingBoardCategory: number;
  document: string;
  eventUploadForDD: Array<EventUpload>;
  files: Array<File>;
}
export class ControllingBoardRaw implements IControllingBoard {
  controllingBoardId: string;
  projectId: string;
  controllingBoardNumber: string;
  controllingBoardType: number;
  controllingBoardStatus: number;
  publicCommentText: string;
  userId: string;
  entryDate: Date;
  activeInd: string;
  document: string;
  controllingBoardDate: Date;
  submissionDate: Date;
  controllingBoardCategory: number;
  eventUploadForDD: Array<EventUpload>;
  files: Array<File>;
}


