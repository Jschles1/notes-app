import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { serverSideAuthentication } from '../../../../lib/auth';
import { selectNotes } from '../../../../store/notes/selectors';
import { fetchNotesInit } from '../../../../store/notes/reducer';
import { findNote, formatDate } from '../../../../lib/helpers';
import NoteDetail from '../../../../components/notes/NoteDetail';
import NoteForm from '../../../../components/form/NoteForm';

export const getServerSideProps = serverSideAuthentication();

const NoteDetailPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const notes = useSelector(selectNotes);
    const folderId = router.query.folderId as string;
    const noteId = router.query.noteId as string;
    const note = React.useMemo(() => findNote(notes, noteId), [notes]);

    React.useEffect(() => {
        if (!notes.length) {
            dispatch(fetchNotesInit(folderId));
        }
    }, [notes]);

    // TODO: redirect if notes are present and note not found

    return (
        <Box
            sx={{
                maxWidth: '80%',
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <NoteDetail note={note} folderId={folderId} noteId={noteId} />
        </Box>
    );
};

export default NoteDetailPage;
