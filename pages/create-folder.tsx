import * as React from 'react';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import CreateFolderForm from '@components/form/CreateFolderForm';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';
import fetcher from '@lib/graphql/fetcher';
import { CREATE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import { useFolders } from '@lib/graphql/hooks';
import { useStoreActions } from '@store/hooks';

const CreateFolderPage: NextPage = () => {
    const { email } = useLoggedInUser();
    const { revalidate } = useFolders();
    const setAlert = useStoreActions((actions) => actions.setAlert);
    const router = useRouter();

    const onSubmit = async (data) => {
        const mutation = CREATE_FOLDER_MUTATION(data.name, email);
        const response = await fetcher(mutation);
        if (response?.createFolder?.success) {
            revalidate();
            router.push('/folders');
        } else {
            setAlert({
                type: 'error',
                message: `Error creating folder: ${response?.createFolder?.message}`,
            });
        }
    };

    return <CreateFolderForm onSubmit={onSubmit} />;
};

export default CreateFolderPage;
