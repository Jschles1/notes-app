import { AppState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectRedirect = createSelector(
    (state: AppState) => state.history.redirect,
    (redirect) => redirect
);
