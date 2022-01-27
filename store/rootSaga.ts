import { all, takeEvery } from 'redux-saga/effects';
import { fetchFoldersInit } from './folders/reducer';
import { fetchFoldersSaga } from './folders/saga';

function* watchFolders() {
    yield takeEvery(fetchFoldersInit.type, fetchFoldersSaga);
}

export default function* rootSaga() {
    yield all([watchFolders()]);
}
