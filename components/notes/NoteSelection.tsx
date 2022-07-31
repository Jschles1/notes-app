import * as React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import NotesList from './NotesList';
import SelectionContainer from '@components/layout/SelectionContainer';
import AddButton from '@components/ui/AddButton';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import UpdateFolderForm from '@components/form/UpdateFolderForm';
import { decodeHtml } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { useFolders } from '@lib/graphql/hooks';
import { useStoreState } from '@store/hooks';

const NoteSelection: React.FC = () => {
    const { selectedFolder, isLoading } = useFolders();
    const isUpdatingFolder = !!useStoreState((state) => state.updatingFolder);
    const notes = selectedFolder?.notes || [];
    const searchQuery = useStoreState((state) => state.searchQuery);
    const router = useRouter();
    const { isDesktop } = useMediaQuery();

    const folderId = router.query.folderId as string;

    const selectedNotes = notes.filter((note) => {
        return (
            note.name.toLowerCase().includes(searchQuery) ||
            decodeHtml(note.description).toLowerCase().includes(searchQuery)
        );
    });

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
                    {selectedFolder?.name}
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
