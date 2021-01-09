"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectEventReferenceDataLoadError = exports.getProjectEventReferenceDataLoaded = exports.getProjectEventReferenceDataLoading = exports.getEventStatuses = exports.getSecondaryEvents = exports.getPrimaryEvents = exports.reducer = exports.initialState = exports.referenceDataFeatureKey = void 0;
var store_1 = require("@ngrx/store");
var reference_data_actions_1 = require("../actions/reference-data.actions");
exports.referenceDataFeatureKey = 'referenceData';
exports.initialState = {
    primaryEvents: null,
    secondaryEvents: null,
    eventStatuses: null,
    projectEventsReferenceDataLoading: false,
    projectEventsReferenceDataLoaded: false,
    projectEventsReferenceDataLoadError: null,
};
exports.reducer = store_1.createReducer(exports.initialState, store_1.on(reference_data_actions_1.referenceDataActionTypes.loadProjectEventsReferenceData, function (state, action) {
    return __assign(__assign({}, state), { projectEventsReferenceDataLoading: true });
}), store_1.on(reference_data_actions_1.referenceDataActionTypes.loadProjectEventsReferenceDataSuccess, function (state, action) {
    return __assign(__assign({}, state), { primaryEvents: action.data.primaryEvents, secondaryEvents: action.data.secondaryEvents, eventStatuses: action.data.eventStatuses, projectEventsReferenceDataLoading: false, projectEventsReferenceDataLoaded: true });
}), store_1.on(reference_data_actions_1.referenceDataActionTypes.loadProjectEventsReferenceDataFailure, function (state, action) {
    return __assign(__assign({}, state), { projectEventsReferenceDataLoadError: action.error, projectEventsReferenceDataLoading: false });
}));
exports.getPrimaryEvents = function (state) { return state.primaryEvents; };
exports.getSecondaryEvents = function (state) { return state.secondaryEvents; };
exports.getEventStatuses = function (state) { return state.eventStatuses; };
exports.getProjectEventReferenceDataLoading = function (state) { return state.projectEventsReferenceDataLoading; };
exports.getProjectEventReferenceDataLoaded = function (state) { return state.projectEventsReferenceDataLoaded; };
exports.getProjectEventReferenceDataLoadError = function (state) { return state.projectEventsReferenceDataLoadError; };
//# sourceMappingURL=reference-data.reducer.js.map