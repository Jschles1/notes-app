import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { serverSideAuthentication } from '@lib/auth';
import { findNote } from '@lib/helpers';
import NoteDetail from '@components/notes/NoteDetail';
import { useFolders } from '@lib/graphql/hooks';

export const getServerSideProps = serverSideAuthentication();

const NoteDetailPage: NextPage = () => {
    const router = useRouter();
    const { selectedFolder } = useFolders();
    const notes = selectedFolder?.notes;
    const folderId = router.query.folderId as string;
    const noteId = router.query.noteId as string;
    const note = React.useMemo(() => findNote(notes || [], noteId), [notes]);

    const redirectToNotesPage = () => router.push(`/folders/${folderId}/notes`);

    React.useEffect(() => {
        if (!!notes && !notes.length) {
            redirectToNotesPage();
        }
    }, [notes]);

    if (!!notes && !note) {
        redirectToNotesPage();
    }

    return (
        <Box sx={{ flex: 1 }}>
            <NoteDetail note={note} folderId={folderId} noteId={noteId} />
        </Box>
    );
};

export default NoteDetailPage;
