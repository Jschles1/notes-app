import * as React from 'react';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Box } from '@mui/material';
import { serverSideAuthentication } from '../lib/auth';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import { useFolders } from '@lib/graphql/hooks';
import fetcher from '@lib/graphql/fetcher';
import useEmail from '@lib/hooks/useEmail';
import { CREATE_NOTE_MUTATION } from '@lib/graphql/mutations';
import { setAlert } from '@store/alert/reducer';

const NoteEditor = dynamic(() => import('@components/form/NoteEditor'), {
    ssr: false,
});

export const getServerSideProps = serverSideAuthentication();

const CreateNotePage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { email } = useEmail();
    const { isLoading, selectedFolder, revalidate } = useFolders();
    const [selectedFolderId, _] = React.useState((router.query.folderId as string) || '');

    const onNoteSubmit = async (data) => {
        const { name, description } = data;
        const folderId = router.query.folderId;
        const mutation = CREATE_NOTE_MUTATION(folderId, name, description, email);
        const response = await fetcher(mutation);
        if (response?.createNote?.success) {
            dispatch(
                setAlert({
                    type: 'success',
                    message: 'Note Successfully Created!',
                })
            );
            revalidate();
            router.push(`/folders/${folderId}/notes`);
        } else {
            // TODO: handle error
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
