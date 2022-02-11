import { AppState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectUser = createSelector(
    (state: AppState) => state.auth.user,
    (user) => user
);
