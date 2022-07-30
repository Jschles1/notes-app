import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import NotesList from './NotesList';
import SelectionContainer from '@components/layout/SelectionContainer';
import AddButton from '@components/ui/AddButton';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import UpdateFolderForm from '@components/form/UpdateFolderForm';
import { selectSelectedFolder, selectUpdatingFolder } from '@store/folders/selectors';
import { selectNotes, selectNotesSearchQuery } from '@store/notes/selectors';
import { fetchNotesInit } from '@store/notes/reducer';
import { selectIsLoading } from '@store/loading/selectors';
import { decodeHtml } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';

const NoteSelection: React.FC = () => {
    const dispatch = useDispatch();
    const selectedFolder = useSelector(selectSelectedFolder);
    const isUpdatingFolder = useSelector(selectUpdatingFolder);
    const notes = useSelector(selectNotes);
    const searchQuery = useSelector(selectNotesSearchQuery);
    const isLoading = useSelector(selectIsLoading);
    const router = useRouter();
    const { isDesktop } = useMediaQuery();

    const folderId = router.query.folderId as string;

    const selectedNotes = notes.filter((note) => {
        return (
            note.name.toLowerCase().includes(searchQuery) ||
            decodeHtml(note.description).toLowerCase().includes(searchQuery)
        );
    });

    React.useEffect(() => {
        if (folderId) {
            dispatch(fetchNotesInit(folderId));
        }
    }, [folderId]);

    return (
        <SelectionContainer>
            {isUpdatingFolder && !isDesktop ? (
                <UpdateFolderForm name={selectedFolder} id={folderId} />
            ) : (
                <Box
                    sx={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginTop: !isDesktop ? 2 : 0,
                        marginBottom: !isDesktop ? '27px' : 2,
                    }}
                >
                    {selectedFolder}
                </Box>
            )}

            {isDesktop && <AddButton color="bg.main" resource="note" />}

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
