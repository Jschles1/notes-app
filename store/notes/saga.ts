import * as Effects from 'redux-saga/effects';
import {
    fetchNotesSuccess,
    fetchNotesFail,
    createNoteSuccess,
    createNoteFail,
    // updateNoteSuccess,
    // updateNoteFail,
    // deleteNoteSuccess,
    // deleteNoteFail,
} from './reducer';
import { toggleLoading } from '../loading/reducer';
import { setSelectedFolder } from '../folders/reducer';
// import { selectSelectedNote } from '../selectors/notes';
import { selectSelectedFolder } from '../folders/selectors';
import { setRedirect } from '../history/reducer';
import { setAlert } from '../alert/reducer';

const { put }: any = Effects;

export function* fetchNotesSaga(action) {
    yield put(toggleLoading());
    try {
        const folderId = action.payload;
        const response = yield fetch(`/api/folders/${folderId}/notes`);
        const data = yield response.json();
        yield put(fetchNotesSuccess(data.data.collection));
        yield put(setSelectedFolder(data.data.folderName));
        yield put(toggleLoading());
    } catch (e) {
        yield put(toggleLoading());
        yield put(fetchNotesFail());
    }
}

export function* createNoteSaga(action) {
    const folderId = action.payload.id;
    yield put(toggleLoading());
    try {
        const body = JSON.stringify({
            name: action.payload.name,
            description: action.payload.description,
            id: folderId,
        });
        const response = yield fetch(`/api/folders/${folderId}/notes`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        yield put(createNoteSuccess(data.data));
        yield put(toggleLoading());
        yield put(
            setAlert({
                type: 'success',
                message: 'Note Successfully Created!',
            })
        );
        yield put(setRedirect(`/folders/${folderId}/notes`));
    } catch (e) {
        yield put(toggleLoading());
        yield put(createNoteFail());
    }
}
