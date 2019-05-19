import * as notes from './notes.action';
import { Note } from './notes.model';

export interface State {
    lastNoteId: number;
    allNotes: any[];
    selected: Note;
    selectedIndex: number;
}

const initialState: State = {
    lastNoteId: 1,
    allNotes: [],
    selected: {
        noteId: 0,
        title: '',
        noteContent: ''
    },
    selectedIndex: -1
};

export function reducer(state = initialState, action: notes.NoteActions ): State {

    switch (action.type) {
        case notes.SAVE_NOTE: {
            const newNote = new Note();
            newNote.noteId = state.lastNoteId + 1;
            newNote.title = action.payload.title === '' ? `Untitled ${state.lastNoteId}` : action.payload.title;
            newNote.noteContent = action.payload.noteContent;
            localStorage.setItem('allNotes', JSON.stringify([newNote, ...state.allNotes]));
            return Object.assign({}, state, {
                lastNoteId: newNote.noteId,
                allNotes: [ newNote, ...state.allNotes],
                selected: newNote,
                selectedIndex: 0,
            });
        }
        case notes.UPDATE_NOTE: {
            // const updatedAllNotes = state.allNotes.map(note => {
            //     if (note.noteId === action.payload.noteId) {
            //         note.title = action.payload.title;
            //         note.noteContent = action.payload.noteContent;
            //     }
            //     return note;
            // });
            const updatedAllNotes = state.allNotes;
            const noteToBeUpdated = updatedAllNotes[state.selectedIndex];
            noteToBeUpdated.title = action.payload.title === '' ? `Untitled ${state.selectedIndex}` : action.payload.title;
            noteToBeUpdated.noteContent = action.payload.noteContent;

            return Object.assign({}, state, {
                allNotes: updatedAllNotes
            });
        }
        case notes.SELECT_NOTE: {
            return Object.assign({}, state, {
                selected: action.payload,
                selectedIndex: action.index
            });
        }
        case notes.CREATE_NOTE: {
            return Object.assign({}, state, {
                selected: {
                    noteId: 0,
                    title: '',
                    noteContent: ''
                },
                selectedIndex: -1
            });
        }
        case notes.DELETE_NOTE: {
            // const index = state.allNotes.indexOf(note => note.noteId === action.payload);
            const updatedNotes = state.allNotes;
            updatedNotes.splice(state.selectedIndex, 1);
            return Object.assign({}, state, {
                allNotes: updatedNotes,
                selected: {
                    noteId: 0,
                    title: '',
                    noteContent: ''
                },
                selectedIndex: -1
            });
        }
        default:
            return state;
    }
}

export const getAllNotes = (state: State) => state.allNotes;
export const getSelectedNote = (state: State) => state.selected;
export const getSelectedIndex = (state: State) => state.selectedIndex;
