import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { GenericLookupListForDD } from 'src/app/project/models/project-for-update';
import { LookupItem } from '../../../shared/models/lookup-item';
import { referenceDataActionTypes } from '../actions/reference-data.actions';


export const referenceDataFeatureKey = 'referenceData';

export interface State {
  primaryEvents: LookupItem[];
  secondaryEvents: LookupItem[];
  eventStatuses: LookupItem[];
  projectEventsReferenceDataLoading: boolean;
  projectEventsReferenceDataLoaded: boolean;
  projectEventsReferenceDataLoadError: string;
  // phase
  phaseStauses: GenericLookupListForDD[];
  projectPhaseReferenceDataLoading: boolean;
  projectPhaseReferenceDataLoaded: boolean;
  projectPhaseReferenceDataLoadError: string;
  //budget catgeories
  budgetCategories: GenericLookupListForDD[];
  budgetCategoriesLoading: boolean;
  budgetCategoriesLoaded: boolean;
  budgetCategoriesDataLoadError: string;
  // Controlling Board
  cbCategoryItems: LookupItem[];
  cbtypeItems: LookupItem[];
  cbStatusItems: LookupItem[];
  projectCBReferenceDataLoading: boolean;
  projectCBReferenceDataLoaded: boolean;
  projectCBReferenceDataLoadError: string;
  // Fing Funding
  fundingSource: LookupItem[];
  fundingType: LookupItem[];
  fundingReferenceDataLoading: boolean;
  funbdingReferenceDataLoaded: boolean;
  fundingReferenceDataLoadError: string;
}

export const initialState: State = {
  primaryEvents: null,
  secondaryEvents: null,
  eventStatuses: null,
  projectEventsReferenceDataLoading: false,
  projectEventsReferenceDataLoaded: false,
  projectEventsReferenceDataLoadError: null,
  //phase
  phaseStauses: null,
  projectPhaseReferenceDataLoading: false,
  projectPhaseReferenceDataLoaded: false,
  projectPhaseReferenceDataLoadError: null,
  //budget category
  budgetCategories: null,
  budgetCategoriesLoading: false,
  budgetCategoriesLoaded: false,
  budgetCategoriesDataLoadError: null,
  // Controlling Board
  cbCategoryItems: null,
  cbtypeItems: null,
  cbStatusItems: null,
  projectCBReferenceDataLoading: false,
  projectCBReferenceDataLoaded: false,
  projectCBReferenceDataLoadError: null,

  // Controlling Board
  fundingSource: null,
  fundingType: null,
  fundingReferenceDataLoading: false,
  funbdingReferenceDataLoaded: false,
  fundingReferenceDataLoadError: null
};


export const reducer = createReducer(
  initialState,

  on(referenceDataActionTypes.loadProjectCBReferenceData, (state, action) => {
    return {
      ...state,
      projectCBReferenceDataLoading: true,
      projectCBReferenceDataLoaded: false,
    };
  }),

  on(referenceDataActionTypes.loadProjectCBReferenceDataSuccess, (state, action) => {
    return {
      ...state,
      cbCategoryItems: action.data.cbCategoryItems,
      cbtypeItems: action.data.cbtypeItems,
      cbStatusItems: action.data.cbStatusItems,
      projectCBReferenceDataLoading: false,
      projectCBReferenceDataLoaded: true,
      loadProjectCBReferenceData: true,
    };
  }),

  on(referenceDataActionTypes.loadProjectCBReferenceDataFailure, (state, action) => {
    return {
      ...state,
      projectCBReferenceDataLoadError: action.error,
      projectCBReferenceDataLoaded: false,
      projectCBReferenceDataLoading: false,
    };
  }),

  on(referenceDataActionTypes.loadProjectEventsReferenceData, (state, action) => {
    return {
      ...state,
      projectEventsReferenceDataLoading: true
    };
  }),

  on(referenceDataActionTypes.loadProjectEventsReferenceDataSuccess, (state, action) => {
    return {
      ...state,
      primaryEvents: action.data.primaryEvents,
      secondaryEvents: action.data.secondaryEvents,
      eventStatuses: action.data.eventStatuses,
      projectEventsReferenceDataLoading: false,
      projectEventsReferenceDataLoaded: true,
    };
  }),
  on(referenceDataActionTypes.loadProjectEventsReferenceDataFailure, (state, action) => {
    return {
      ...state,
      projectEventsReferenceDataLoadError: action.error,
      projectEventsReferenceDataLoading: false,
    };
  }),

  //phase reducers
  on(referenceDataActionTypes.loadProjectPhaseReferenceData, (state, action) => {
    return {
      ...state,
      projectPhaseReferenceDataLoading: true
    };
  }),
  on(referenceDataActionTypes.loadProjectPhaseReferenceDataSuccess, (state, action) => {
    return {
      ...state,
      phaseStauses: action.data.phaseStauses,
      projectPhaseReferenceDataLoaded: true,
      projectPhaseReferenceDataLoading: false
    };
  }),
  on(referenceDataActionTypes.loadProjectPhaseReferenceDataFailure, (state, action) => {
    return {
      ...state,
      projectPhaseReferenceDataLoadError: action.error,
      projectEventsReferenceDataLoading: false
    };
  }),

  //budget categories
  on(referenceDataActionTypes.loadProjectBudgetReferenceData, (state, action) => {
    return {
      ...state,
      budgetCategoriesLoading: true
    }
  }),
  on(referenceDataActionTypes.loadProjectBudgetReferenceDataSuccess, (state, action) => {
    return {
      ...state,
      budgetCategoriesLoading: false,
      budgetCategoriesLoaded: true,
      budgetCategories: action.budgetCategories
    }
  }),
  on(referenceDataActionTypes.loadProjectBudgetReferenceDataFailure, (state, action) => {
    return {
      ...state,
      budgetCategoriesLoading: false,
      budgetCategoriesLoaded: true,
      budgetCategoriesDataLoadError: action.error
    }
  }),

  //fin funding
  on(referenceDataActionTypes.loadFundingReferenceData, (state, action) => {
    return {
      ...state,
      fundingReferenceDataLoading: true,
      fundingReferenceDataLoaded: false,
    };
  }),

  on(referenceDataActionTypes.loadFundingReferenceDataSuccess, (state, action) => {
    return {
      ...state,
      fundingSource: action.data.fundingSource,
      fundingType: action.data.fundingType,
      fundingReferenceDataLoading: false,
      fundingReferenceDataLoaded: true,
      fundingReferenceData: true,
    };
  }),

  on(referenceDataActionTypes.loadFundingReferenceDataFailure, (state, action) => {
    return {
      ...state,
      projectCBReferenceDataLoadError: action.error,
      fundingReferenceDataLoaded: false,
      fundingReferenceDataLoading: false,
    };
  }),

);


export const getPrimaryEvents = (state: State) => state.primaryEvents;
export const getSecondaryEvents = (state: State) => state.secondaryEvents;
export const getEventStatuses = (state: State) => state.eventStatuses;
export const getProjectEventReferenceDataLoading = (state: State) => state.projectEventsReferenceDataLoading;
export const getProjectEventReferenceDataLoaded = (state: State) => state.projectEventsReferenceDataLoaded;
export const getProjectEventReferenceDataLoadError = (state: State) => state.projectEventsReferenceDataLoadError;
//phase
export const getPhaseStatuses = (state: State) => state.phaseStauses;
export const getProjectPhaseReferenceDataLoading = (state: State) => state.projectPhaseReferenceDataLoading;
export const getProjectPhaseReferenceDataLoaded = (state: State) => state.projectPhaseReferenceDataLoaded;
export const getProjectPhaseReferenceDataLoadError = (state: State) => state.projectPhaseReferenceDataLoadError;
//budget category
export const getBudgetCategories = (state: State) => state.budgetCategories;
export const getBudgetCategoriesDataLoading = (state: State) => state.budgetCategoriesLoading;
export const getBudgetCategoriesDataLoaded = (state: State) => state.budgetCategoriesLoaded;
export const getBudgetCategoriesDataLoadError = (state: State) => state.budgetCategoriesDataLoadError;
// Controlling Board
export const getCBCategoryItems = (state: State) => state.cbCategoryItems;
export const getCBtypeItems = (state: State) => state.cbtypeItems;
export const getCBStatusItems = (state: State) => state.cbStatusItems;
export const getProjectCBReferenceDataLoading = (state: State) => state.projectCBReferenceDataLoading;
export const getProjectCBReferenceDataLoaded = (state: State) => state.projectCBReferenceDataLoaded;
export const getProjectCBReferenceDataLoadError = (state: State) => state.projectCBReferenceDataLoadError;

// fin funding
export const getFundingSource = (state: State) => state.fundingSource;
export const getFundingType = (state: State) => state.fundingType;
export const getFundingReferenceDataLoading = (state: State) => state.fundingReferenceDataLoading;
export const getFundingReferenceDataLoaded = (state: State) => state.funbdingReferenceDataLoaded;
export const getFundingReferenceDataLoadError = (state: State) => state.fundingReferenceDataLoadError;





