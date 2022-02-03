import * as Effects from 'redux-saga/effects';
import {
    fetchNotesSuccess,
    fetchNotesFail,
    // createNoteSuccess,
    // createNoteFail,
    // updateNoteSuccess,
    // updateNoteFail,
    // deleteNoteSuccess,
    // deleteNoteFail,
} from './reducer';
import { toggleLoading } from '../loading/reducer';
// import { selectSelectedNote } from '../selectors/notes';
// import { selectSelectedFolder } from '../selectors/folders';

const { call, put, select }: any = Effects;

// function* getFolderId(): Generator<any, any, any> {
//   return yield select(selectSelectedFolder);
// }

// function* getNoteId(): Generator<any, any, any> {
//   return yield select(selectSelectedNote);
// }

export function* fetchNotesSaga(action) {
    yield put(toggleLoading());
    try {
        const folderId = action.payload;
        const response = yield fetch(`/api/folders/${folderId}/notes`);
        const data = yield response.json();
        yield put(fetchNotesSuccess(data.data));
        yield put(toggleLoading());
    } catch (e) {
        yield put(toggleLoading());
        yield put(fetchNotesFail());
    }
}
