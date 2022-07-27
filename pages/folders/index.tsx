import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoldersList from '@components/folders/FoldersList';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import { fetchFoldersInit } from '@store/folders/reducer';
import { selectFolders } from '@store/folders/selectors';
import { selectIsLoading } from '@store/loading/selectors';
import { serverSideAuthentication } from '../../lib/auth';
import { NextPage } from 'next';
import SelectionContainer from '@components/layout/SelectionContainer';

export const getServerSideProps = serverSideAuthentication();

const FoldersPage: NextPage = () => {
    const dispatch = useDispatch();
    const folders = useSelector(selectFolders);
    const isLoading = useSelector(selectIsLoading);

    React.useEffect(() => {
        dispatch(fetchFoldersInit());
        // TODO: Reset selected folder
    }, []);

    return <SelectionContainer>{isLoading ? <LoadingIndicator /> : <FoldersList />}</SelectionContainer>;
};

export default FoldersPage;
