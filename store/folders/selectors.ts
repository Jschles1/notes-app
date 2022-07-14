import { AppState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectFolders = createSelector(
    (state: AppState) => state.folders.folders,
    (folders) => folders
);

export const selectSelectedFolder = createSelector(
    (state: AppState) => state.folders.selected,
    (selectedFolder) => selectedFolder
);

export const selectUpdatingFolder = createSelector(
    (state: AppState) => state.folders.updating,
    (updating) => updating
);
