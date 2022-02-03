import { createSlice } from '@reduxjs/toolkit';
import { Note } from '../../interfaces';

const initialState = {
    notes: [],
    selected: null,
    isCreatingNote: false,
};

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        fetchNotesInit: {
            reducer: () => {},
            prepare: (id: string) => ({ payload: id }),
        },
        fetchNotesSuccess(state, action) {
            state.notes = action.payload;
        },
        fetchNotesFail() {},
        // createNoteInit: {
        //   reducer: () => {},
        //   prepare: (note: { name: string; description: string; }) => ({ payload: note }),
        // },
        // createNoteSuccess(state, action) {
        //   state.notes = [action.payload, ...state.notes];
        //   state.selected = action.payload.id;
        //   state.isCreatingNote = false;
        // },
        // createNoteFail() {},
        // updateNoteInit: {
        //   reducer: () => {},
        //   prepare: (note: { name: string; description: string; }) => ({ payload: note }),
        // },
        // updateNoteSuccess(state, action) {
        //   state.notes = state.notes.map((note: Note) => {
        //     if (action.payload.id === note._id) {
        //       return action.payload;
        //     }
        //     return note;
        //   });
        // },
        // updateNoteFail() {},
        // deleteNoteInit() {},
        // deleteNoteSuccess(state, action) {
        //   state.notes = state.notes.filter((notes) => notes._id !== action.payload);
        //   state.selected = null;
        // },
        // deleteNoteFail() {},
        // setSelectedNote(state, action) {
        //   state.selected = action.payload;
        // },
        // toggleCreateNote(state) {
        //   state.isCreatingNote = !state.isCreatingNote;
        // },
        // resetNotes: () => initialState,
    },
});

export const {
    fetchNotesInit,
    fetchNotesSuccess,
    fetchNotesFail,
    // createNoteInit,
    // createNoteSuccess,
    // createNoteFail,
    // updateNoteInit,
    // updateNoteSuccess,
    // updateNoteFail,
    // deleteNoteInit,
    // deleteNoteSuccess,
    // deleteNoteFail,
    // setSelectedNote,
    // toggleCreateNote,
    // resetNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
