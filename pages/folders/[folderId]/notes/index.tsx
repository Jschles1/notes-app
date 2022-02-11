import { Box } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../../components/ui/Card';
import FolderNameHeader from '../../../../components/folders/FolderNameHeader';
import { serverSideAuthentication } from '../../../../lib/auth';
import { fetchNotesInit } from '../../../../store/notes/reducer';
import { selectSelectedFolder } from '../../../../store/folders/selectors';
import { updateFolderInit } from '../../../../store/folders/reducer';
import { selectUser } from '../../../../store/auth/selectors';

export const getServerSideProps = serverSideAuthentication();

const NotesPage: NextPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const selectedFolder = useSelector(selectSelectedFolder);
    const router = useRouter();
    const folderId = router.query.folderId as string;

    const onEditSubmit = (data) => {
        const updatedFolder = { name: data.name, _id: folderId, user: user.id };
        dispatch(updateFolderInit(updatedFolder));
    };

    useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    });

    return (
        <Card sx={{ height: '100%' }}>
            <FolderNameHeader
                name={selectedFolder}
                onEdit={onEditSubmit}
                onDelete={() => {}}
            />
        </Card>
    );
};

export default NotesPage;