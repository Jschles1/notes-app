import { all, takeEvery } from 'redux-saga/effects';
import { createFolderInit, fetchFoldersInit } from './folders/reducer';
import { fetchNotesInit } from './notes/reducer';
import { createFolderSaga, fetchFoldersSaga } from './folders/saga';
import { fetchNotesSaga } from './notes/saga';

function* watchFolders() {
    yield takeEvery(fetchFoldersInit.type, fetchFoldersSaga);
    yield takeEvery(createFolderInit.type, createFolderSaga);
}

function* watchNotes() {
    yield takeEvery(fetchNotesInit.type, fetchNotesSaga);
}

export default function* rootSaga() {
    yield all([watchFolders(), watchNotes()]);
}
