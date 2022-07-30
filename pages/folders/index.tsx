import * as React from 'react';
import { NextPage } from 'next';
import FoldersList from '@components/folders/FoldersList';
import AddButton from '@components/ui/AddButton';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import SelectionContainer from '@components/layout/SelectionContainer';
import { serverSideAuthentication } from '@lib/auth';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { useFolders } from '@lib/graphql/hooks';

export const getServerSideProps = serverSideAuthentication();

const FoldersPage: NextPage = () => {
    const { isLoading } = useFolders();
    const { isDesktop } = useMediaQuery();

    return (
        <>
            <SelectionContainer>{isLoading ? <LoadingIndicator /> : <FoldersList />}</SelectionContainer>
            {!isDesktop && <AddButton variant="mobile" resource="folder" />}
        </>
    );
};

export default FoldersPage;
