"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectEventReferenceDataLoading = exports.getProjectEventReferenceDataLoadError = exports.getProjectEventReferenceDataLoaded = exports.getEventStatuses = exports.getSecondaryEvents = exports.getPrimaryEvents = exports.getReferenceDataState = exports.getCoreState = exports.reducers = void 0;
var store_1 = require("@ngrx/store");
var fromReferenceData = require("./reference-data.reducer");
exports.reducers = {
    referenceData: fromReferenceData.reducer,
};
/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `project` state.
 *
 * Selectors are used with the `select` operator.
 *
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.projectState$ = state$.pipe(select(getProjectState));
 *   }
 * }
 * ```
 */
/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
exports.getCoreState = store_1.createFeatureSelector('core');
/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
/* Reference Data Selectors */
exports.getReferenceDataState = store_1.createSelector(exports.getCoreState, function (state) { return state.referenceData; });
exports.getPrimaryEvents = store_1.createSelector(exports.getReferenceDataState, fromReferenceData.getPrimaryEvents);
exports.getSecondaryEvents = store_1.createSelector(exports.getReferenceDataState, fromReferenceData.getSecondaryEvents);
exports.getEventStatuses = store_1.createSelector(exports.getReferenceDataState, fromReferenceData.getEventStatuses);
exports.getProjectEventReferenceDataLoaded = store_1.createSelector(exports.getReferenceDataState, fromReferenceData.getProjectEventReferenceDataLoaded);
exports.getProjectEventReferenceDataLoadError = store_1.createSelector(exports.getReferenceDataState, fromReferenceData.getProjectEventReferenceDataLoadError);
exports.getProjectEventReferenceDataLoading = store_1.createSelector(exports.getReferenceDataState, fromReferenceData.getProjectEventReferenceDataLoading);
//# sourceMappingURL=index.js.map