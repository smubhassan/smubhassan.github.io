import {Action} from '@ngrx/store';
import {type} from '../util';
import { Note } from './notes.model';

/**
 * Note Actions
 */
export const CREATE_NOTE = '[Notes] Create Note';
export const SAVE_NOTE = '[Notes] Save Note';
export const UPDATE_NOTE = '[Notes] Update Note';
export const DELETE_NOTE = '[Notes] Delete Note';
export const SELECT_NOTE = '[Notes] Select Note';

/**
 * Note Actions
 */
export class CreateNoteAction implements Action {
    readonly type = CREATE_NOTE;

    constructor() {
    }
}

export class SaveNoteAction implements Action {
    readonly type = SAVE_NOTE;

    constructor(public payload: Note) {
    }
}

export class SelectNoteAction implements Action {
    readonly type = SELECT_NOTE;

    constructor(public index: number, public payload: Note) {
    }
}

export class UpdateNoteAction implements Action {
    readonly type = UPDATE_NOTE;

    constructor(public payload: Note) {
    }
}

export class DeleteNoteAction implements Action {
    readonly type = DELETE_NOTE;

    constructor() {
    }
}

export type NoteActions = CreateNoteAction | SelectNoteAction | SaveNoteAction | UpdateNoteAction | DeleteNoteAction;
