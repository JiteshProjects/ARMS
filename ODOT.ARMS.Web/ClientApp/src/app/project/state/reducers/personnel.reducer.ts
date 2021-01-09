import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';
import { PersonnelRaw } from '../../models/projects';
import {createFeatureSelector,createSelector,createReducer,Action,on} from '@ngrx/store';
import { personnelActions } from '../actions/personnel.actions';

export interface PersonnelState extends EntityState<PersonnelRaw> {
  error: null;
}
export const adapterPersonnel: EntityAdapter<PersonnelRaw> = createEntityAdapter<PersonnelRaw>({
  selectId: (personnel: PersonnelRaw) => personnel.personnelId,
  sortComparer: false,
});

/*Creating an initial state */
export const initialState: PersonnelState = adapterPersonnel.getInitialState({
  error: null,
});

export const personnelReducer = createReducer(
  initialState,

  on(
    personnelActions.LoadSelectedPersonnelSuccess, (state, {SelectedPersonnel}) => {
      return adapterPersonnel.setAll(SelectedPersonnel, state);
    }
  ),

  on(personnelActions.LoadSelectedPersonnelFailure, (state, action) => {
    return {...state, error: action.error};
  }),

  on(personnelActions.AddPersonnelSuccess, (state, action) => {
    return adapterPersonnel.addOne(action.personnel, state);
  }),

  on(personnelActions.AddPersonnelFailure, (state, action) => {
    return {...state, error: action.error};
  }),

  on(personnelActions.UpdatePersonnelSuccess, (state, action) => {
    console.log(action.personnel);
    console.log(state);
    return adapterPersonnel.upsertOne(action.personnel, state);
  }),

  on(personnelActions.UpdatePersonnelFailure, (state, action) => {
    return {...state, error: action.error};
  })
);

export function reducer(state: PersonnelState | undefined, action: Action) {
  return personnelReducer(state, action);
}


export const {
  selectAll,
  selectIds,
  selectEntities,
  selectTotal
} = adapterPersonnel.getSelectors();

/* helps us get the feature/specific slice of the State based on the specified name */
export const getPersonnelFeatureState = createFeatureSelector<PersonnelState>('personnel');

/* createSelector- helps us get any part/property  of the slice using the feature slice and specifying the property */
export const getAllPersonnel = createSelector(getPersonnelFeatureState, selectAll);
