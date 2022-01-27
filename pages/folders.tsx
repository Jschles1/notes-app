import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSession } from 'next-auth/react';
import Layout from '../components/Layout';
import { wrapper } from '../store';
import { setUser } from '../store/auth/reducer';
import { fetchFoldersInit } from '../store/folders/reducer';

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

    useEffect(() => {
        dispatch(fetchFoldersInit());
    }, []);

    return (
        <Layout title="Folders | Next.js + TypeScript Example">
            <h1>Folders</h1>
        </Layout>
    );
};

export default FoldersPage;
