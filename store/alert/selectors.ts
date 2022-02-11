import { AppState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectAlert = createSelector(
    (state: AppState) => state.alert,
    (alert) => alert
);
