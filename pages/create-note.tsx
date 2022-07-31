import * as React from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Box } from '@mui/material';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import { useFolders } from '@lib/graphql/hooks';
import fetcher from '@lib/graphql/fetcher';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';
import { CREATE_NOTE_MUTATION } from '@lib/graphql/mutations';
import { useStoreActions } from '@store/hooks';

const NoteEditor = dynamic(() => import('@components/form/NoteEditor'), {
    ssr: false,
});

const CreateNotePage: NextPage = () => {
    const setAlert = useStoreActions((actions) => actions.setAlert);
    const router = useRouter();
    const { email } = useLoggedInUser();
    const { isLoading, selectedFolder, revalidate } = useFolders();
    const [selectedFolderId, _] = React.useState((router.query.folderId as string) || '');

    const onNoteSubmit = async (data) => {
        const { name, description } = data;
        const folderId = router.query.folderId as string;
        const mutation = CREATE_NOTE_MUTATION(folderId, name, description, email);
        const response = await fetcher(mutation);
        if (response?.createNote?.success) {
            setAlert({
                type: 'success',
                message: 'Note Successfully Created!',
            });

            revalidate();
            router.push(`/folders/${folderId}/notes`);
        } else {
            setAlert({
                type: 'error',
                message: `Error creating note: ${response?.createNote?.message}`,
            });
        }
    };

    return (
        <Box
            sx={{
                paddingX: 2,
                flex: 1,
                backgroundColor: 'secondary.light',
                height: '100%',
                maxHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {isLoading ? (
                <LoadingIndicator />
            ) : selectedFolder && selectedFolderId ? (
                <NoteEditor onSubmit={onNoteSubmit} />
            ) : null}
        </Box>
    );
};

export default CreateNotePage;
