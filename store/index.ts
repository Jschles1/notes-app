import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { wrapMakeStore, nextReduxCookieMiddleware } from 'next-redux-cookie-wrapper';
import foldersReducer from './folders/reducer';
import notesReducer from './notes/reducer';
import alertReducer from './alert/reducer';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const makeStore = wrapMakeStore(() => {
    const store = configureStore({
        reducer: {
            folders: foldersReducer,
            notes: notesReducer,
            alert: alertReducer,
        },
        devTools: isDevelopment,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                thunk: false,
            }).prepend(
                nextReduxCookieMiddleware({
                    subtrees: ['alert.type', 'alert.message'],
                })
            ),
    });
    return store;
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: false,
});
