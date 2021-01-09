import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { Observable, of, combineLatest, forkJoin } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { map, tap, catchError, switchMap, take, filter } from 'rxjs/operators';
import * as fromCore from "../../core/state/reducers";
import * as fromProject from "../state/reducers";
import { ProjectService } from './project.service';
import { EventService } from './event.service';
import { EventRaw } from '../models/event-raw';
import { Phase } from '../models/phase';
import { loadProjectEvents, loadProjectPhaseList } from '../state/actions/edit-project-events-page.actions';
//import { navigateToNotFound } from '../../core/state/actions/core.actions';
import { loadProjectEventsReferenceData } from '../../core/state/actions/reference-data.actions';

@Injectable({
  providedIn: 'root'
})
export class EditProjectEventsResolverService {

  projectId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectService: ProjectService,
    public eventService: EventService) {

    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
  }

  loadProjectEvents(projectId: string): Observable<boolean> {
    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.eventService.getEventsByProjectId(projectId),
      this.projectService.getPhaseList(projectId)
    ).pipe(
      tap((data: [boolean, EventRaw[], Phase[]]) => {
        this.projectStore.dispatch(loadProjectEvents({ events: data[1] }));
        this.projectStore.dispatch(loadProjectPhaseList({ phases: data[2] }));
      }),
      map((data: [boolean, EventRaw[], Phase[]]) => !!data[1] && !!data[2]),
      catchError(() => {
        //this.coreStore.dispatch(navigateToNotFound());
        return of(false);
      })
    );
  }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the Reference Data state to turn `true`, emitting one time once loading
   * has finished.If the data not already loaded then we dispatch a action to load.
   */
  waitForReferenceDataToLoad(): Observable<boolean> {
    return this.coreStore.pipe(
      select(fromCore.getProjectEventReferenceDataLoaded),
      tap(loaded => {
        if (!loaded) {
          console.info('waitForReferenceDataToLoad');
          this.coreStore.dispatch(loadProjectEventsReferenceData());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.projectId$
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.info('Resolver Project Loads');
        return this.loadProjectEvents(projectId);
      })
    );
  }

}
