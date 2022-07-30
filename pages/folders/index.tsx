import * as React from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import FoldersList from '@components/folders/FoldersList';
import AddButton from '@components/ui/AddButton';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import SelectionContainer from '@components/layout/SelectionContainer';
import { fetchFoldersInit } from '@store/folders/reducer';
import { selectIsLoading } from '@store/loading/selectors';
import { serverSideAuthentication } from '@lib/auth';
import useMediaQuery from '@lib/hooks/useMediaQuery';

export const getServerSideProps = serverSideAuthentication();

const FoldersPage: NextPage = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const { isDesktop } = useMediaQuery();

    React.useEffect(() => {
        dispatch(fetchFoldersInit());
        // TODO: Reset selected folder
    }, []);

    return (
        <>
            <SelectionContainer>{isLoading ? <LoadingIndicator /> : <FoldersList />}</SelectionContainer>
            {!isDesktop && <AddButton variant="mobile" resource="folder" />}
        </>
    );
};

export default FoldersPage;
