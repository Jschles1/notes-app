import { AppState } from '..';

export const selectRedirect = (state: AppState) => state.history.redirect;
