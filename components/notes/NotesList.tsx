import * as React from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@mui/material';
import { Note } from '../../interfaces';
import NoteCard from './NoteCard';

interface Props {
    notes: Note[];
}

const NotesList: React.FC<Props> = ({ notes }) => {
    const router = useRouter();
    const folderId = router.query.folderId as string;
    const noteId = router.query.folderId as string;

    return (
        <Stack
            sx={{
                overflowY: 'auto',
                flex: 1,
            }}
            spacing={2}
        >
            {notes.map((note) => (
                <NoteCard
                    folderId={folderId}
                    noteId={note._id}
                    name={note.name}
                    description={note.description}
                    updatedAt={note.updatedAt}
                    selectedNote={noteId}
                />
            ))}
        </Stack>
    );
};

export default React.memo(NotesList);
