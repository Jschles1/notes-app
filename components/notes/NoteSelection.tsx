import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import NotesList from './NotesList';
import SelectionContainer from '@components/layout/SelectionContainer';
import AddButton from '@components/ui/AddButton';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import { selectSelectedFolder } from '@store/folders/selectors';
import { selectNotes, selectNotesSearchQuery } from '@store/notes/selectors';
import { fetchNotesInit } from '@store/notes/reducer';
import { selectIsLoading } from '@store/loading/selectors';
import { decodeHtml } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';

const NoteSelection: React.FC = () => {
    const dispatch = useDispatch();
    const selectedFolder = useSelector(selectSelectedFolder);
    const notes = useSelector(selectNotes);
    const searchQuery = useSelector(selectNotesSearchQuery);
    const isLoading = useSelector(selectIsLoading);
    const router = useRouter();
    const { isMobile } = useMediaQuery();

    const folderId = router.query.folderId as string;

    const selectedNotes = notes.filter((note) => {
        return (
            note.name.toLowerCase().includes(searchQuery) ||
            decodeHtml(note.description).toLowerCase().includes(searchQuery)
        );
    });

    React.useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    }, [folderId]);

    return (
        <SelectionContainer>
            {!isMobile && (
                <>
                    <Box
                        sx={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            marginBottom: '27px',
                        }}
                    >
                        {selectedFolder}
                    </Box>
                    <AddButton color="bg.main" resource="note" />
                </>
            )}
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
