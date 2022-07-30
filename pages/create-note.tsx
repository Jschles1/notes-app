import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Box } from '@mui/material';
import { fetchFoldersInit, setSelectedFolder } from '@store/folders/reducer';
import { selectSelectedFolder, selectFolders } from '@store/folders/selectors';
import { createNoteInit } from '@store/notes/reducer';
import { selectRedirect } from '@store/history/selectors';
import { clearRedirect } from '@store/history/reducer';
import { serverSideAuthentication } from '../lib/auth';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import { selectIsLoading } from '@store/loading/selectors';

const NoteEditor = dynamic(() => import('@components/form/NoteEditor'), {
    ssr: false,
});

export const getServerSideProps = serverSideAuthentication();

const CreateNotePage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const folders = useSelector(selectFolders);
    const selectedFolder = useSelector(selectSelectedFolder);
    const successRedirect = useSelector(selectRedirect);
    const isLoading = useSelector(selectIsLoading);
    const [selectedFolderId, setSelectedFolderId] = React.useState((router.query.folderId as string) || '');
    const [isChoosingFolder, setIsChoosingFolder] = React.useState(!selectedFolder);

    const onFolderSelect = (data) => {
        dispatch(setSelectedFolder(data.folder));
        const newSelectedFolder = folders.find((folder) => folder.name === data.folder);
        setSelectedFolderId(newSelectedFolder._id);
        setIsChoosingFolder(false);
        router.replace({
            pathname: '/create-note',
            query: {
                folderId: newSelectedFolder._id,
            },
        });
    };

    const onNoteSubmit = (data) => {
        const payload = { ...data, id: router.query.folderId };
        dispatch(createNoteInit(payload));
    };

    React.useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

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
