import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FoldersList from '../../components/folders/FoldersList';
import LoadingIndicator from '../../components/ui/LoadingIndicator';
import { fetchFoldersInit } from '../../store/folders/reducer';
import { selectFolders } from '../../store/folders/selectors';
import { selectIsLoading } from '../../store/loading/selectors';
import { serverSideAuthentication } from '../../lib/auth';

export const getServerSideProps = serverSideAuthentication();

const FoldersPage = () => {
    const dispatch = useDispatch();
    const folders = useSelector(selectFolders);
    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchFoldersInit());
    }, []);

    return <>{isLoading ? <LoadingIndicator /> : <FoldersList folders={folders} />}</>;
};

export default FoldersPage;
