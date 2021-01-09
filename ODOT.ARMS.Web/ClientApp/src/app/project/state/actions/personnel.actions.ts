import { createAction, props } from '@ngrx/store';

import { PersonnelRaw } from '../../models/projects';


export const LoadSelectedPersonnel = createAction('[personnel] Load Personnel', props<{ projectId: string }>());
export const LoadSelectedPersonnelSuccess = createAction('[personnel] Load Personnnel success',props<{ SelectedPersonnel: PersonnelRaw[] }>());
export const LoadSelectedPersonnelFailure = createAction('[personnel] Load Personnel Failed', props<{ error: string }>());
export const AddPersonnel = createAction('[personnel] Add new Personnel', props<{ personnel: PersonnelRaw }>());
export const AddPersonnelSuccess = createAction('[personnel] Add new Personnel Success', props<{ personnel: PersonnelRaw }>());
export const AddPersonnelFailure = createAction('[personnel] Add new Personnel Failed', props<{ error: string }>());
export const UpdatePersonnel = createAction('[personnel] Update Personnel', props<{ personnel: PersonnelRaw }>());
export const UpdatePersonnelSuccess = createAction('[personnel] Update Personnel Success', props<{ personnel: PersonnelRaw }>());
export const UpdatePersonnelFailure = createAction('[personnel] Update Personnel Failed', props<{ error: string }>());


export const personnelActions = {
    LoadSelectedPersonnel,
    LoadSelectedPersonnelSuccess,
    LoadSelectedPersonnelFailure,
    AddPersonnel,
    AddPersonnelSuccess,
    AddPersonnelFailure,
    UpdatePersonnel,
    UpdatePersonnelSuccess,
    UpdatePersonnelFailure
};

