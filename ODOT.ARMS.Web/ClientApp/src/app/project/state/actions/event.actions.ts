import { createAction, props } from "@ngrx/store";
//import { IEvents, EventsRaw } from "../../models/events";
import { EventRaw } from '../../models/event-raw';
import { Update } from "@ngrx/entity";

//**************************Events***********************//
export const loadSelectedEvent = createAction(
  '[Selected Event List] Load Selected Event via Service',
  props<{ projectId: string }>()
);
export const selectedEventsLoaded = createAction(
  '[Selected Event Effect] Selected Event Loaded Successfully',
  props<{ SelectedEvents: EventRaw[] }>()
);
export const selectedEventsFail = createAction(
  '[Selected Event Effect] Selected Event Loaded Fail',
  props<{ error:any }>()
);

export const addEvent = createAction(
  '[Create Event Component] Create Event',
  props<{ event: EventRaw }>()
);

export const addEventSuccess = createAction(
  '[Create Event Success] Create Event',
  props<{ event: EventRaw }>()
);

export const updateEvent = createAction(
  '[Event List Operations] Update Event',
  props<{ event: EventRaw  }>()
);

export const updateEventSuccess = createAction(
  '[Event List Success] Update Event',
  props<{ event: EventRaw }>()
);

//**************************Events***********************//
export const eventActionTypes = {
  loadSelectedEvent,
  selectedEventsLoaded,
  selectedEventsFail,
  addEvent,
  addEventSuccess,
  updateEvent,
  updateEventSuccess
};


