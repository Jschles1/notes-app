import { NextPage } from 'next';
import Link from 'next/link';
import { signIn, getSession } from 'next-auth/react';
import { Box } from '@mui/system';
import Layout from '../components/Layout';
import { wrapper } from '../store';
import { setUser } from '../store/auth/reducer';

// Test dispatch
export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (ctx): Promise<any> => {
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
        }
);

const IndexPage: NextPage = (props) => {
    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>

            <Box
                sx={{
                    color: 'secondary.main',
                }}
            >
                Styles Test
            </Box>
        </Layout>
    );
};

export default IndexPage;