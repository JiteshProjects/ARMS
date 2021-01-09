import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ControllingBoardRaw, IControllingBoard } from '../../models/controllingBoard';

// **************************ControllingBoard***********************//
export const loadSelectedCB = createAction(
  '[Selected CB List] Load Selected CB via Service',
  props<{ projectId: string }>()
);
export const selectedCBLoaded = createAction(
  '[Selected CB Effect] Selected CB Loaded Successfully',
  props<{ SelectedCBs: IControllingBoard[] }>()
);
export const selectedCBFail = createAction(
  '[Selected CB Effect] Selected CB Loaded Fail',
  props<{ error: any }>()
);

export const createCB = createAction(
  '[Create CB Component] Create CB',
  props<{ formData: FormData }>()
);

export const createCBSuccess = createAction(
  '[Create CB Success] Create CB',
  props<{ CBs: IControllingBoard }>()
);

export const updateCB = createAction(
  '[CB List Operations] Update CB',
  props<{ formData: FormData }>()
);

export const updateCBSucess = createAction(
  '[CB List Success] Update CB',
  props<{ CBs: IControllingBoard }>()
);

// **************************CBs***********************//
export const CBActionTypes = {
  loadSelectedCB,
  selectedCBLoaded,
  selectedCBFail,
  createCB,
  createCBSuccess,
  updateCB,
  updateCBSucess
};


