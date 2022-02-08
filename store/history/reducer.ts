import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    redirect: '',
};

const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        setRedirect(state, action) {
            state.redirect = action.payload;
        },
        clearRedirect(state) {
            state.redirect = '';
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.redirect,
            };
        },
    },
});

export const { setRedirect, clearRedirect } = historySlice.actions;

export default historySlice.reducer;
