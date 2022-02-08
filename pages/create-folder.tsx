import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { NextPage } from 'next';
import Card from '../components/ui/Card';
import CreateFolderForm from '../components/form/CreateFolderForm';
import { serverSideAuthentication } from '../lib/auth';
import { createFolderInit } from '../store/folders/reducer';
import { selectRedirect } from '../store/history/selectors';
import { clearRedirect } from '../store/history/reducer';

export const getServerSideProps = serverSideAuthentication();

const CreateFolderPage: NextPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const successRedirect = useSelector(selectRedirect);
    const onSubmit = (data) => {
        dispatch(createFolderInit(data));
    };

    useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

    return <CreateFolderForm onSubmit={onSubmit} />;
};

export default CreateFolderPage;
