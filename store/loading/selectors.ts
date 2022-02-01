import { AppState } from '..';

export const selectIsLoading = (state: AppState) => state.loading.isLoading;
