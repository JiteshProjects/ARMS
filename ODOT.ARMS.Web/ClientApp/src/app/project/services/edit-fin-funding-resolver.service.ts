import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
//import { navigateToNotFound } from '../../core/state/actions/core.actions';
import { loadFundingReferenceData } from '../../core/state/actions/reference-data.actions';
import * as fromCore from "../../core/state/reducers/index";
import { FundingRaw } from '../models/fundings-raw';
import { loadProjectFunding } from '../state/actions/edit-funding-page.actions';
import * as fromProject from "../state/reducers";
import * as fromFunding from "../state/reducers/edit-fin-funding-page.reducer";
import { FundingService } from './Funding.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class EditProjectFundingResolverService {

  projectId$: Observable<string>;

  constructor(private route: ActivatedRoute,
    public coreStore: Store<fromCore.State>,
    public projectStore: Store<fromProject.State>,
    public projectService: ProjectService,
    public fundingStore: Store<fromFunding.State>, public fundingService: FundingService) {

    this.projectId$ = this.projectStore.select(fromProject.getProjectId);
  }

  loadFinFundings(projectId: string): Observable<boolean> {
    return forkJoin(
      this.waitForReferenceDataToLoad(),
      this.fundingService.getFundingByProjectId(projectId),
    ).pipe(
      tap((data: [boolean, FundingRaw[]]) => {
        this.fundingStore.dispatch(loadProjectFunding({ Funding: data[1] }));
      }),
      map((data: [boolean, FundingRaw[]]) => !!data[1]),
      catchError(() => {
        console.log("Error");
        return of(false);
      })
    );
  }

  waitForReferenceDataToLoad(): Observable<boolean> {
    this.coreStore.dispatch(loadFundingReferenceData());
    return of(true);
  }

  //waitForReferenceDataToLoad(): Observable<boolean> {
  //  debugger;
  //  this.coreStore.dispatch(loadFundingReferenceData());
  //  return this.coreStore.pipe(
  //    select(fromCore.getProjectEventReferenceDataLoaded),
  //    tap(loaded => {
  //      console.info('waitForReferenceDataToLoad for funding');
  //      this.coreStore.dispatch(loadFundingReferenceData());
  //    }),
  //    filter(loaded => loaded),
  //    take(1)
  //  );
  //}





  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return combineLatest(
      this.projectId$
    ).pipe(
      take(1),
      switchMap(([projectId]: [string]) => {
        console.info('Resolver Project Loads');
        return this.loadFinFundings(projectId);
      })
    );
  }


}
