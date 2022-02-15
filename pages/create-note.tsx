import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { serverSideAuthentication } from '../lib/auth';
import NoteForm from '../components/form/NoteForm';
import { fetchFoldersInit, setSelectedFolder } from '../store/folders/reducer';
import { selectSelectedFolder, selectFolders } from '../store/folders/selectors';
import { Box } from '@mui/material';
import ChooseFolder from '../components/form/ChooseFolder';
import Card from '../components/ui/Card';

export const getServerSideProps = serverSideAuthentication();

const CreateNotePage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const folders = useSelector(selectFolders);
    const selectedFolder = useSelector(selectSelectedFolder);
    const [selectedFolderId, setSelectedFolderId] = useState((router.query.folderId as string) || '');
    const [isChoosingFolder, setIsChoosingFolder] = useState(!selectedFolder);

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

    useEffect(() => {
        if (!folders.length) {
            dispatch(fetchFoldersInit());
        }
    }, [folders]);

    console.log('folders available', folders);

    return (
        <Box
            sx={{
                maxWidth: '80%',
                margin: '0 auto',
            }}
        >
            <ChooseFolder
                folders={folders}
                onSelect={onFolderSelect}
                selectedFolder={selectedFolder}
                setIsChoosingFolder={setIsChoosingFolder}
                isChoosingFolder={isChoosingFolder}
            />
            {selectedFolder && selectedFolderId ? <NoteForm /> : null}
        </Box>
    );
};

export default CreateNotePage;
