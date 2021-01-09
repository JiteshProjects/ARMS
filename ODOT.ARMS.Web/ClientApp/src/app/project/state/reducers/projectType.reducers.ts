import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, createFeatureSelector, createSelector, Action } from '@ngrx/store';
import { ProjectType } from '../../models/projects';
import { projectActionTypes } from '../actions/project.actions';

export interface ProjectTypeState extends EntityState<ProjectType> {
  selectedAdministrationCategoryId: string | null;
  isLoading: false;
  error: null;
  whichProject: string;
}

export const adapter: EntityAdapter<ProjectType> = createEntityAdapter<ProjectType>({
  selectId: (administrationCategory: ProjectType) => administrationCategory.projectTypeId,
  sortComparer: false,
});

export const initialState: ProjectTypeState = adapter.getInitialState({
  selectedAdministrationCategoryId: null,
  isLoading: false,
  error: null,
  whichProject: null
});

export const projectTypeReducer = createReducer(
  initialState,

  on(projectActionTypes.projectTypesLoaded, (state, action) => {
    return adapter.addAll(
      action.ProjectTypeList,
      { ...state, projectTypeLoaded: true }
    );
  }),

  on(projectActionTypes.createProjectType, (state, action) => {
    return adapter.addOne(action.projectType, state);
  }),

  on(projectActionTypes.deleteProjectType, (state, action) => {
    return adapter.removeOne(action.projectTypeId, state);
  }),

  on(projectActionTypes.updateProjectType, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),
);

export const { selectAll, selectIds} = adapter.getSelectors();

export const courseFeatureSelector = createFeatureSelector<ProjectTypeState>('projectType');

export const getAllProjectTypes = createSelector(
  courseFeatureSelector,
  selectAll
);
