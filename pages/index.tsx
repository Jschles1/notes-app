import { NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import WelcomeUser from '../components/WelcomeUser';
import { wrapper } from '../store';
import { setUser } from '../store/auth/reducer';
import { selectUser } from '../store/auth/selectors';

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

const IndexPage: NextPage = (props) => {
    const user = useSelector(selectUser);
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            {/* <h1>Hello Next.js 👋</h1> */}
            <WelcomeUser user={user} />
        </Layout>
    );
};

export default IndexPage;
