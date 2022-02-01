import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import FoldersList from '../components/folders/FoldersList';
import { wrapper } from '../store';
import { setUser } from '../store/auth/reducer';
import { fetchFoldersInit } from '../store/folders/reducer';
import { selectFolders } from '../store/folders/selectors';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx): Promise<any> => {
    const session = await getSession({ req: ctx.req });

    if (!session) {
        store.dispatch(setUser(null));
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    store.dispatch(setUser(session.user));

    return {
        props: { session },
    };
});

const FoldersPage = () => {
    const dispatch = useDispatch();
    const folders = useSelector(selectFolders);

    useEffect(() => {
        dispatch(fetchFoldersInit());
    }, []);

    return (
        <Layout title="Folders | Next.js + TypeScript Example">
            <FoldersList folders={folders} />
        </Layout>
    );
};

export default FoldersPage;
