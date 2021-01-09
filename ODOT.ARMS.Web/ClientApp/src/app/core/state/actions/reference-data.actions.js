"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.referenceDataActionTypes = exports.loadProjectEventsReferenceDataFailure = exports.loadProjectEventsReferenceDataSuccess = exports.loadProjectEventsReferenceData = void 0;
var store_1 = require("@ngrx/store");
exports.loadProjectEventsReferenceData = store_1.createAction('[ReferenceData] Load ProjectEventsReferenceData');
exports.loadProjectEventsReferenceDataSuccess = store_1.createAction('[ReferenceData] Load ProjectEventsReferenceData Success', store_1.props());
exports.loadProjectEventsReferenceDataFailure = store_1.createAction('[ReferenceData] Load ProjectEventsReferenceData Failure', store_1.props());
exports.referenceDataActionTypes = {
    loadProjectEventsReferenceData: exports.loadProjectEventsReferenceData,
    loadProjectEventsReferenceDataSuccess: exports.loadProjectEventsReferenceDataSuccess,
    loadProjectEventsReferenceDataFailure: exports.loadProjectEventsReferenceDataFailure,
};
//# sourceMappingURL=reference-data.actions.js.map