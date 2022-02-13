import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { serverSideAuthentication } from '../lib/auth';
import { Box } from '@mui/material';
import { selectSelectedFolder } from '../store/folders/selectors';

export const getServerSideProps = serverSideAuthentication();

const CreateNotePage: NextPage = () => {
    const router = useRouter();
    const selectedFolder = useSelector(selectSelectedFolder);
    const folderId = router.query.folderId;

    if (selectedFolder) {
        return (
            <Box>
                Folder: {selectedFolder} {folderId}
            </Box>
        );
    }

    return <Box>Create Note</Box>;
};

export default CreateNotePage;
