import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = {
    type: '',
    message: '',
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert(state, action) {
            state.type = action.payload.type;
            state.message = action.payload.message;
        },
        clearAlert: () => initialState,
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.alert,
            };
        },
    },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
