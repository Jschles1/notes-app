import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { serverSideAuthentication } from '../../../../lib/auth';
import { selectNotes } from '../../../../store/notes/selectors';
import { fetchNotesInit } from '../../../../store/notes/reducer';
import { findNote } from '../../../../lib/helpers';

export const getServerSideProps = serverSideAuthentication();

const NoteDetailPage: NextPage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const notes = useSelector(selectNotes);
    const folderId = router.query.folderId as string;
    const noteId = router.query.noteId as string;
    const note = React.useMemo(() => findNote(notes, noteId), [notes]);
    console.log('note', note);

    React.useEffect(() => {
        if (!notes.length) {
            dispatch(fetchNotesInit(folderId));
        }
    }, [notes]);

    return (
        <Box>
            <Box>Note Detail</Box>
        </Box>
    );
};

export default NoteDetailPage;
