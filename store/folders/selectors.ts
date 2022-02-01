import { AppState } from '..';

export const selectFolders = (state: AppState) => state.folders.folders;
