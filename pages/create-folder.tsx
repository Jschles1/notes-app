import * as React from 'react';
import { mutate } from 'swr';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import CreateFolderForm from '@components/form/CreateFolderForm';
import { serverSideAuthentication } from '../lib/auth';
import { selectRedirect } from '@store/history/selectors';
import { clearRedirect } from '@store/history/reducer';
import useEmail from '@lib/hooks/useEmail';
import fetcher from '@lib/graphql/fetcher';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import { CREATE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import { useFolders } from '@lib/graphql/hooks';

export const getServerSideProps = serverSideAuthentication();

const CreateFolderPage: NextPage = () => {
    const { email } = useEmail();
    const { revalidate } = useFolders();
    const dispatch = useDispatch();
    const router = useRouter();
    const successRedirect = useSelector(selectRedirect);

    const onSubmit = async (data) => {
        const mutation = CREATE_FOLDER_MUTATION(data.name, email);
        const response = await fetcher(mutation);
        if (response?.createFolder?.success) {
            revalidate();
            router.push('/folders');
        } else {
            // TODO: handle error
        }
    };

    React.useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

    return <CreateFolderForm onSubmit={onSubmit} />;
};

export default CreateFolderPage;
