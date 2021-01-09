import { createAction, props } from '@ngrx/store';
import { Phase } from '../../models/phase';

export const loadProjectPhases = createAction(
    '[EditPrjPhasePage] Load ProjectPhases',
    props<{ phases: Phase[] }>()
);

export const setSelectedPhase = createAction(
    '[EditPrjPhasePage] Set Selected ProjectPhase',
    props<{ selectedPhase: Phase }>()
);

export const addPhase = createAction(
    '[EditPrjPhasePage] Add ProjectPhase',
    props<{ phase: Phase }>()
);

export const addPhaseSuccess = createAction(
    '[EditPrjPhasePage] Add ProjectPhase Success',
    props<{ phase: Phase }>()
);

export const addPhaseFailure = createAction(
    '[EditPrjPhasePage] Add ProjectPhase Failed',
    props<{ error: string }>()
);

export const updatePhase = createAction(
    '[EditPrjPhasePage] Update ProjectPhase',
    props<{ phase: Phase }>()
);

export const updatePhaseSuccess = createAction(
    '[EditPrjPhasePage] Update ProjectPhase Success',
    props<{ phase: Phase }>()
);

export const updatePhaseFailure = createAction(
    '[EditPrjPhasePage] Update ProjectPhase Failed',
    props<{ error: string }>()
);

export const setSavePhaseDialogStatus = createAction(
    '[EditPrjPhasePage] Set Phase Dialog Status',
    props<{ status: boolean }>()
);

export const mergePhases = createAction(
    '[EditPrjPhasePage] Merge Phases',
    props<{ projectId: string, phases: Phase[] }>()
);

export const mergePhasesSuccess = createAction(
    '[EditPrjPhasePage] Merge Phases Success',
    props<{ phases: Phase[] }>()
);

export const mergePhasesFailure = createAction(
    '[EditPrjPhasePage] Merge Phase Failure',
    props<{ error: string }>()
);


export const EditPrjPhasePageActionTypes = {
    loadProjectPhases,
    setSelectedPhase,
    addPhase,
    addPhaseSuccess,
    addPhaseFailure,
    updatePhase,
    updatePhaseSuccess,
    updatePhaseFailure,
    setSavePhaseDialogStatus,
    mergePhases,
    mergePhasesSuccess,
    mergePhasesFailure
}


