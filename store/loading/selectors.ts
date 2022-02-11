import { AppState } from '..';
import { createSelector } from '@reduxjs/toolkit';

export const selectIsLoading = createSelector(
    (state: AppState) => state.loading.isLoading,
    (isLoading) => isLoading
);
