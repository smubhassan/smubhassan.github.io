/*
  Import createSelector from reselect to make selection of different parts of the state fast efficient
 */
import { createSelector } from 'reselect';
/*
  Import the store logger to log all the actions to the console
 */
import {storeLogger} from 'ngrx-store-logger';

/*
 Import the layout state
 */

import * as fromLayout from './layout/layout.reducer';
import * as fromNotes from './notes/notes.reducer';
import {compose} from '@ngrx/core';
import {combineReducers, State} from '@ngrx/store';
import {state} from '@angular/core';

export interface AppState {
  layout: fromLayout.State;
  notes: fromNotes.State;
}

export const reducers = {
  layout: fromLayout.reducer,
  notes: fromNotes.reducer
};



const developmentReducer:Function = compose(storeLogger(), combineReducers)(reducers);


export function metaReducer(state: any, action: any) {
  return developmentReducer(state, action);
}


/**
 * Layout selectors
 */

export const getLayoutState = (state: AppState) => state.layout;

export const getLayoutOpenedModalName = createSelector(getLayoutState , fromLayout.getOpenedModalName);

export const getLayoutLeftSidenavState = createSelector(getLayoutState, fromLayout.getLeftSidenavState);

export const getLayoutAlertsState = createSelector(getLayoutState, fromLayout.getAlerts);


/**
 * Notes
 */

export const getNotesState = (state: AppState) => state.notes;

export const getAllNotes = createSelector(getNotesState, fromNotes.getAllNotes);

export const getSelectedNote = createSelector(getNotesState, fromNotes.getSelectedNote);

export const getSelectedNoteIndex = createSelector(getNotesState, fromNotes.getSelectedIndex);
