import * as Effects from 'redux-saga/effects';
import { fetchFoldersSuccess, fetchFoldersFail } from './reducer';
import { toggleLoading } from '../loading/reducer';

const { call, put }: any = Effects;

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
