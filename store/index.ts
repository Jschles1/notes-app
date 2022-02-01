import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createWrapper } from 'next-redux-wrapper';
import { wrapMakeStore, nextReduxCookieMiddleware } from 'next-redux-cookie-wrapper';
import authReducer from './auth/reducer';
import foldersReducer from './folders/reducer';
import loadingReducer from './loading/reducer';
import rootSaga from './rootSaga';

const isDevelopment = process.env.NODE_ENV !== 'production';

export const makeStore = wrapMakeStore(() => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
        reducer: {
            auth: authReducer,
            folders: foldersReducer,
            loading: loadingReducer,
        },
        devTools: isDevelopment,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                thunk: false,
            })
                .prepend(
                    nextReduxCookieMiddleware({
                        subtrees: ['auth.user'],
                    })
                )
                .concat(sagaMiddleware),
    });
    sagaMiddleware.run(rootSaga);
    return store;
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: isDevelopment,
});
