import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap, map, tap, catchError } from 'rxjs/operators';
import { editPrjCBPageActionTypes } from '../actions/edit-prj-cb-page.actions';
import { EditPrjCbPageService } from '../../services/edit-prj-cb-page.service';
//import { SaveService } from '../../services/save.service';
import { UploadsService } from '../../services/uploads.service';
import { of } from 'rxjs';
//import { HttpResponse } from '@angular/common/http';
import { kendonotificationservice } from '../../../shared/services/kendo-notification.service';
import { ControllingBoardRaw } from '../../models/cb-raw';
//import { EventUpload } from '../../models/event-upload';

//==================================================================================================================================================
//
// I will use
//
// editPrjEventsPageActionTypes.DownloadFileById
// editPrjEventsPageActionTypes.updateUpload
// editPrjEventsPageActionTypes.setSelectedUploadSrc
//
// To handle the file actions
// I honestly think i need to move it to its own actions, effects and reducer
// just because it is used everywhere
//
//==================================================================================================================================================


@Injectable()
export class EditPrjCbPageEffects {

  constructor(private cbService: EditPrjCbPageService, private uploadService: UploadsService, private actions$: Actions, private notificationService: kendonotificationservice) { }

  createCB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPrjCBPageActionTypes.addCB),
      concatMap(action => this.cbService.addCB(action.cb).pipe(

        map((cb: ControllingBoardRaw) => {
          this.notificationService.showSuccess('Create Controlling Board Successful');
          return editPrjCBPageActionTypes.addCBSuccess({ cb });
        }),
        catchError(err => {
          this.notificationService.showError('Create Controlling Board failed');
          return of(editPrjCBPageActionTypes.addCBFailure({ error: err }));
        })
      )
      )
    )
  );

  updateCB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editPrjCBPageActionTypes.updateCB),
      concatMap(action => this.cbService.updateCB(action.cb).pipe(

        map((cb: ControllingBoardRaw) => {
          this.notificationService.showSuccess('Update Controlling Board Successful');
          return editPrjCBPageActionTypes.updateCBSuccess({ cb });
        }),
        catchError(err => {
          this.notificationService.showError('Update Controlling Board failed');
          return of(editPrjCBPageActionTypes.updateCBFailure({ error: err }));
        })
      )
      )
    )
  );

}
