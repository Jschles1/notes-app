import * as Effects from 'redux-saga/effects';
import {
    fetchFoldersSuccess,
    fetchFoldersFail,
    createFolderSuccess,
    createFolderFail,
    updateFolderSuccess,
    updateFolderFail,
    setSelectedFolder,
    deleteFolderSuccess,
    deleteFolderFail,
    setUpdating,
} from './reducer';
import { toggleLoading } from '../loading/reducer';
import { setRedirect } from '../history/reducer';
import { setAlert } from '../alert/reducer';

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
        });
        const response = yield fetch(`/api/folders/${_id}`, {
            method: 'PATCH',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        yield put(updateFolderSuccess({ name: data.data.name, _id }));
        yield put(toggleLoading());
        yield put(setUpdating(''));
        yield put(
            setAlert({
                type: 'success',
                message: 'Folder Successfully Updated!',
            })
        );
    } catch (e) {
        yield put(toggleLoading());
        yield put(updateFolderFail());
    }
}

export function* deleteFolderSaga(action) {
    const id = action.payload;
    yield put(toggleLoading());
    try {
        const response = yield fetch(`/api/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        yield put(deleteFolderSuccess(action.payload));
        yield put(
            setAlert({
                type: 'success',
                message: 'Folder Successfully Deleted!',
            })
        );
        if (window.location.href.includes(id)) {
            yield put(setRedirect('/folders'));
        } else {
            yield put(toggleLoading());
        }
    } catch (e) {
        yield put(toggleLoading());
        yield put(deleteFolderFail());
    }
}
