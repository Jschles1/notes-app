import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { Note } from '../../interfaces';

const initialState = {
    notes: [],
    selected: null,
    isCreatingNote: false,
    searchQuery: '',
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
        createNoteInit: {
            reducer: () => {},
            prepare: (note: { name: string; description: string; id: string }) => ({
                payload: note,
            }),
        },
        createNoteSuccess(state, action) {
            state.notes = [action.payload, ...state.notes];
            state.selected = action.payload.id;
            state.isCreatingNote = false;
        },
        createNoteFail() {},
        updateNoteInit: {
            reducer: () => {},
            prepare: (note: { name: string; description: string; folderId: string; noteId: string }) => ({
                payload: note,
            }),
        },
        updateNoteSuccess(state, action) {
            state.notes = state.notes.map((note: Note) => {
                if (action.payload._id === note._id) {
                    return action.payload;
                }
                return note;
            });
        },
        updateNoteFail() {},
        deleteNoteInit: {
            reducer: () => {},
            prepare: (data: { folderId: string; noteId: string }) => ({
                payload: data,
            }),
        },
        deleteNoteSuccess(state, action) {
            state.notes = state.notes.filter((notes) => notes._id !== action.payload);
            state.selected = null;
        },
        deleteNoteFail() {},
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        resetNotes: () => initialState,
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.notes,
            };
        },
    },
});

export const {
    fetchNotesInit,
    fetchNotesSuccess,
    fetchNotesFail,
    createNoteInit,
    createNoteSuccess,
    createNoteFail,
    updateNoteInit,
    updateNoteSuccess,
    updateNoteFail,
    deleteNoteInit,
    deleteNoteSuccess,
    deleteNoteFail,
    setSearchQuery,
    resetNotes,
} = notesSlice.actions;

export default notesSlice.reducer;
