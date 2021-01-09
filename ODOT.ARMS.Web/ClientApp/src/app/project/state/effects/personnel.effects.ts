import { createEffect, ofType, Actions, Effect } from '@ngrx/effects';
import { InjectableCompiler } from '@angular/compiler/src/injectable_compiler';

import {
  concatMap,
  catchError,
  map,
  tap,
  switchMap,
  mergeMap,
} from 'rxjs/operators';
import { Router } from '@angular/router';
//import { selectProjectId } from '../reducers/index';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { PersonnelDataService } from '../../services/personnel.service';
import { PersonnelRaw } from '../../models/projects';
import { personnelActions } from '../actions/personnel.actions';

@Injectable()
export class PersonnelEffects {
constructor(
    private actions$: Actions,
    private personnelDataService: PersonnelDataService,
    private router: Router
  ) { }

  loadSelectedPersonnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personnelActions.LoadSelectedPersonnel),
      tap(() => console.log(' effect executed loadSelectedPersonnel$')),
      concatMap((action) =>
        this.personnelDataService.loadSelectedPersonnel(action.projectId)
      ),
      map((SelectedPersonnel) =>
        personnelActions.LoadSelectedPersonnelSuccess({ SelectedPersonnel })
      ),
      catchError((err) =>
        of(personnelActions.LoadSelectedPersonnelFailure({ error: err }))
      )
    )
  );

  createPersonnel$ = createEffect(() =>
    this.actions$.pipe(
      ofType(personnelActions.AddPersonnel),
      tap(() => console.log(' effect executed createPersonnel$')),
      concatMap((action) =>
        this.personnelDataService.createPersonnel(action.personnel)
      ),
      map((personnel: PersonnelRaw) =>
        personnelActions.AddPersonnelSuccess({ personnel })),
      catchError((err) => of(personnelActions.AddPersonnelFailure(err)))
    )
  );

  @Effect()
  updatePersonnel$ =
    this.actions$.pipe(
      ofType(personnelActions.UpdatePersonnel),
      tap(() => console.log(' effect executed updatePersonnel$')),
      concatMap((action) =>
        this.personnelDataService.updatePersonnel(action.personnel).pipe(
         map((personnel) => personnelActions.UpdatePersonnelSuccess({ personnel })),
         catchError((err) => of(personnelActions.UpdatePersonnelFailure(err))),
      ),
      ),
  );
}
