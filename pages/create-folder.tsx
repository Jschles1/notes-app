import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import CreateFolderForm from '@components/form/CreateFolderForm';
import { selectRedirect } from '@store/history/selectors';
import { clearRedirect } from '@store/history/reducer';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';
import fetcher from '@lib/graphql/fetcher';
import { CREATE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import { useFolders } from '@lib/graphql/hooks';

const CreateFolderPage: NextPage = () => {
    const { email } = useLoggedInUser();
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
