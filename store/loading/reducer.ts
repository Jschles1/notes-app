import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    isLoading: false,
};

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        toggleLoading(state) {
            state.isLoading = !state.isLoading;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.loading,
            };
        },
    },
});

export const { toggleLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
