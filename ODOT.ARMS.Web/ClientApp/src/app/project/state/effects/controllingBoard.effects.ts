import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, map, tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { CBActionTypes } from '../actions/controllingBoard.actions';
import { ControllingBoardService } from '../../services/controllingBoard.service';

@Injectable()
export class CBEffects {

  loadCBs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CBActionTypes.loadSelectedCB),
      concatMap((action) => this.CBService.getCBsByProjectId(action.projectId)),
      map(SelectedCBs => CBActionTypes.selectedCBLoaded({ SelectedCBs })),
      catchError(err => of(CBActionTypes.selectedCBFail({ error: err })))

    )
  );
  createCB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CBActionTypes.createCB),
      concatMap((action) => this.CBService.createCBs(action.formData)),
      map(CBs => CBActionTypes.createCBSuccess({ CBs }))
    ),
    { dispatch: false }
  );
  UpdateCB$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CBActionTypes.updateCB),
      concatMap((action) => this.CBService.EditArmsCBs(action.formData)),
      map(CBs => CBActionTypes.updateCBSucess({ CBs }))
    ),
    { dispatch: false }
  );

  constructor(private CBService: ControllingBoardService, private actions$: Actions, private router: Router) { }
}
