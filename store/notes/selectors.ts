import { AppState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectNotes = createSelector(
    (state: AppState) => state.notes.notes,
    (notes) => notes
);

export const selectNotesSearchQuery = createSelector(
    (state: AppState) => state.notes.searchQuery,
    (searchQuery) => searchQuery
);
