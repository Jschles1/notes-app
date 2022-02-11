import { all, takeEvery } from 'redux-saga/effects';
import { createFolderInit, deleteFolderInit, fetchFoldersInit, updateFolderInit } from './folders/reducer';
import { fetchNotesInit } from './notes/reducer';
import { createFolderSaga, deleteFolderSaga, fetchFoldersSaga, updateFolderSaga } from './folders/saga';
import { fetchNotesSaga } from './notes/saga';

function* watchFolders() {
    yield takeEvery(fetchFoldersInit.type, fetchFoldersSaga);
    yield takeEvery(createFolderInit.type, createFolderSaga);
    yield takeEvery(updateFolderInit.type, updateFolderSaga);
    yield takeEvery(deleteFolderInit.type, deleteFolderSaga);
}

function* watchNotes() {
    yield takeEvery(fetchNotesInit.type, fetchNotesSaga);
}

export default function* rootSaga() {
    yield all([watchFolders(), watchNotes()]);
}
