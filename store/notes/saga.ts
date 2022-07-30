import * as Effects from 'redux-saga/effects';
import { fetchNotesSuccess, createNoteSuccess, updateNoteSuccess, deleteNoteSuccess } from './reducer';
import { toggleLoading } from '../loading/reducer';
import { setSelectedFolder } from '../folders/reducer';
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
        yield put(
            setAlert({
                type: 'error',
                message: `Error fetching notes: ${e.message}`,
            })
        );
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
        yield put(
            setAlert({
                type: 'error',
                message: `Error creating note: ${e.message}`,
            })
        );
    }
}

export function* updateNoteSaga(action) {
    const { name, description, folderId, noteId } = action.payload;
    yield put(toggleLoading());
    try {
        const body = JSON.stringify({
            name,
            description,
        });
        const response = yield fetch(`/api/folders/${folderId}/notes/${noteId}`, {
            method: 'PATCH',
            body,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = yield response.json();
        yield put(updateNoteSuccess(data.data));
        yield put(
            setAlert({
                type: 'success',
                message: 'Note Successfully Updated!',
            })
        );
        yield put(toggleLoading());
    } catch (e) {
        yield put(toggleLoading());
        yield put(
            setAlert({
                type: 'error',
                message: `Error updating note: ${e.message}`,
            })
        );
    }
}

export function* deleteNoteSaga(action) {
    const { noteId, folderId } = action.payload;
    yield put(toggleLoading());
    try {
        const response = yield fetch(`/api/folders/${folderId}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            yield put(deleteNoteSuccess(noteId));
            yield put(toggleLoading());
            yield put(
                setAlert({
                    type: 'success',
                    message: 'Note Successfully Deleted!',
                })
            );
            yield put(setRedirect(`/folders/${folderId}/notes`));
        } else {
            throw new Error(response.statusText);
        }
    } catch (e) {
        yield put(toggleLoading());
        yield put(
            setAlert({
                type: 'error',
                message: `Error deleting note: ${e.message}`,
            })
        );
    }
}
