import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NotesList from './NotesList';
import SelectionContainer from '../ui/SelectionContainer';
import Button from '../ui/Button';
import Link from '../ui/Link';
import LoadingIndicator from '../ui/LoadingIndicator';
import { selectSelectedFolder } from '../../store/folders/selectors';
import { selectNotes, selectNotesSearchQuery } from '../../store/notes/selectors';
import { fetchNotesInit } from '../../store/notes/reducer';
import { selectIsLoading } from '../../store/loading/selectors';
import { decodeHtml } from '../../lib/helpers';

const NoteSelection: React.FC = () => {
    const dispatch = useDispatch();
    const selectedFolder = useSelector(selectSelectedFolder);
    const notes = useSelector(selectNotes);
    const searchQuery = useSelector(selectNotesSearchQuery);
    const isLoading = useSelector(selectIsLoading);
    const router = useRouter();

    const folderId = router.query.folderId as string;

    const selectedNotes = notes.filter((note) => {
        return (
            note.name.toLowerCase().includes(searchQuery) ||
            decodeHtml(note.description).toLowerCase().includes(searchQuery)
        );
    });

    console.log('selectedNotes', selectedNotes);

    React.useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    }, [folderId]);

    return (
        <SelectionContainer>
            <Box
                sx={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    marginBottom: '27px',
                }}
            >
                {selectedFolder}
            </Box>
            <Link href={`/create-note?folderId=${folderId}`} sx={{ textDecoration: 'none' }}>
                <Button color="bg.main" fullWidth startIcon={<AddIcon />}>
                    Add New Note
                </Button>
            </Link>
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <Box sx={{ marginTop: 3 }}>
                    {selectedNotes.length ? <NotesList notes={selectedNotes} /> : <Box>No notes found.</Box>}
                </Box>
            )}
        </SelectionContainer>
    );
};

export default NoteSelection;
