import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
    wrapMakeStore,
    nextReduxCookieMiddleware,
} from 'next-redux-cookie-wrapper';
import authReducer from './auth/reducer';

export const makeStore = wrapMakeStore(() => {
    // const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: {
            auth: authReducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ serializableCheck: false }).prepend(
                nextReduxCookieMiddleware({
                    subtrees: ['auth.user'],
                })
            ),
    });
    // sagaMiddleware.run(rootSaga);
    return store;
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });