import { AppState } from '..';

export const selectUser = (state: AppState) => state.auth.user;