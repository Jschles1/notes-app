import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { Box } from '@mui/material';
import NoteForm from '../components/form/NoteForm';
import ChooseFolder from '../components/form/ChooseFolder';
import { fetchFoldersInit, setSelectedFolder } from '../store/folders/reducer';
import {
    selectSelectedFolder,
    selectFolders,
} from '../store/folders/selectors';
import { createNoteInit } from '../store/notes/reducer';
import { selectRedirect } from '../store/history/selectors';
import { clearRedirect } from '../store/history/reducer';
import { serverSideAuthentication } from '../lib/auth';

export const getServerSideProps = serverSideAuthentication();

const CreateNotePage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const folders = useSelector(selectFolders);
    const selectedFolder = useSelector(selectSelectedFolder);
    const successRedirect = useSelector(selectRedirect);
    const [selectedFolderId, setSelectedFolderId] = useState(
        (router.query.folderId as string) || ''
    );
    const [isChoosingFolder, setIsChoosingFolder] = useState(!selectedFolder);

    const onFolderSelect = (data) => {
        dispatch(setSelectedFolder(data.folder));
        const newSelectedFolder = folders.find(
            (folder) => folder.name === data.folder
        );
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

    useEffect(() => {
        if (!folders.length) {
            dispatch(fetchFoldersInit());
        }
    }, [folders]);

    useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

    return (
        <Box
            sx={{
                maxWidth: '80%',
                margin: '0 auto',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <ChooseFolder
                folders={folders}
                onSelect={onFolderSelect}
                selectedFolder={selectedFolder}
                setIsChoosingFolder={setIsChoosingFolder}
                isChoosingFolder={isChoosingFolder}
            />
            {selectedFolder && selectedFolderId ? (
                <NoteForm onSubmit={onNoteSubmit} />
            ) : null}
        </Box>
    );
};

export default CreateNotePage;