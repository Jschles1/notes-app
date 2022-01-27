import { AnyAction } from '@reduxjs/toolkit';
import * as Effects from 'redux-saga/effects';
import { fetchFoldersSuccess, fetchFoldersFail } from './reducer';

const { call, put }: any = Effects;

export function* fetchFoldersSaga() {
    // yield put(loading());
    try {
        const response = yield fetch('/api/folders');
        const data = yield response.json();
        yield put(fetchFoldersSuccess(data.data));
        // yield put(loading());
    } catch (e) {
        // yield put(loading());
        yield put(fetchFoldersFail());
    }
}
