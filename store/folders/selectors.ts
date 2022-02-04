import { AppState } from '..';

export const selectFolders = (state: AppState) => state.folders.folders;

export const selectSelectedFolder = (state: AppState) => state.folders.selected;
