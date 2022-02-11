import * as Effects from 'redux-saga/effects';
import {
    fetchFoldersSuccess,
    fetchFoldersFail,
    createFolderSuccess,
    createFolderFail,
    updateFolderSuccess,
    updateFolderFail,
    setSelectedFolder,
} from './reducer';
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

export function* updateFolderSaga(action) {
    const { name, _id } = action.payload;
    yield put(toggleLoading());
    try {
        const body = JSON.stringify({
            name,
            id: _id,
        });
        const response = yield fetch(`/api/folders/${_id}`, {
            method: 'PATCH',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        yield put(updateFolderSuccess({ name: data.name, _id }));
        yield put(toggleLoading());
        yield put(setSelectedFolder(data.name));
    } catch (e) {
        yield put(toggleLoading());
        yield put(updateFolderFail());
    }
}
