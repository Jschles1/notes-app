import { Box } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { serverSideAuthentication } from '../../../../lib/auth';
import { fetchNotesInit } from '../../../../store/notes/reducer';

export const getServerSideProps = serverSideAuthentication();

const NotesPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const folderId = router.query.folderId as string;

    useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    });
    return <Box>Notes Page</Box>;
};

export default NotesPage;
