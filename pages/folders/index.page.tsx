import * as React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import SelectionContainer from '@components/layout/SelectionContainer';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { useFolders } from '@lib/graphql/hooks';

const FoldersList = dynamic(() => import('@components/folders/FoldersList'));
const AddButton = dynamic(() => import('@components/ui/AddButton'));

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
