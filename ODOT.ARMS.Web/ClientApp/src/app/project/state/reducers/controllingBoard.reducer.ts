import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on, createSelector, createFeatureSelector } from "@ngrx/store";
import { CBActionTypes } from "../actions/controllingBoard.actions";
import { IControllingBoard } from "../../models/controllingBoard";

//**************************************CBs***********************************************************************//

export interface CBState extends EntityState<IControllingBoard> {
  isLoading: false;
  error: null;
  SelectedCBs: IControllingBoard;
}

export const adapterCB: EntityAdapter<IControllingBoard> = createEntityAdapter<IControllingBoard>({
  selectId: (CB: IControllingBoard) => CB.controllingBoardId,
  sortComparer: false,
});

export const initialState: CBState = adapterCB.getInitialState({
  isLoading: false,
  error: null,
  SelectedCBs: null,
});

export const CBReducer = createReducer(
  initialState,

  on(CBActionTypes.selectedCBLoaded, (state, action) => {
    return adapterCB.addAll(
      action.SelectedCBs,
      { ...state, projectLoaded: false }
    );
  }),
  on(CBActionTypes.createCBSuccess, (state, action) => {
    return adapterCB.addOne(action.CBs, state);
  }),
  on(CBActionTypes.updateCBSucess, (state, action) => {
    return adapterCB.upsertOne(action.CBs, state);
  }),
);
export const { selectAll, selectIds } = adapterCB.getSelectors();

export const courseFeatureSelector = createFeatureSelector<CBState>('controllingBoard');

export const getAllCBs = createSelector(
  courseFeatureSelector,
  selectAll
);

//**************************************CBs***********************************************************************//
