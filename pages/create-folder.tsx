import { Box } from '@mui/material';
import { NextPage } from 'next';
import Card from '../components/ui/Card';
import CreateFolderForm from '../components/form/CreateFolderForm';
import { serverSideAuthentication } from '../lib/auth';

export const getServerSideProps = serverSideAuthentication();

const CreateFolderPage: NextPage = () => {
    const onSubmit = (data) => {
        console.log('onSubmit', data);
    };
    return <CreateFolderForm onSubmit={onSubmit} />;
};

export default CreateFolderPage;
