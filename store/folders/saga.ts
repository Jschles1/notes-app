import * as Effects from 'redux-saga/effects';
import { fetchFoldersSuccess, fetchFoldersFail, createFolderSuccess, createFolderFail } from './reducer';
import { toggleLoading } from '../loading/reducer';
import { setRedirect } from '../history/reducer';

const { put }: any = Effects;

export function* fetchFoldersSaga() {
    yield put(toggleLoading());
    try {
        const response = yield fetch('/api/folders');
        const data = yield response.json();
        yield put(fetchFoldersSuccess(data.data));
        yield put(toggleLoading());
    } catch (e) {
        yield put(toggleLoading());
        yield put(fetchFoldersFail());
    }
}

export function* createFolderSaga(action) {
    yield put(toggleLoading());
    try {
        const body = JSON.stringify({
            name: action.payload.name,
        });
        const response = yield fetch('/api/folders', {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        yield put(createFolderSuccess(data.data));
        yield put(setRedirect('/folders'));
    } catch (e) {
        yield put(toggleLoading());
        yield put(createFolderFail());
    }
}
