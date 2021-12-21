
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
            console.log(
                '2. Page.getStaticProps uses the store to dispatch things'
            );
            store.dispatch(setUser('Hello 2'));

            console.log('preview', ctx);

            const session = await getSession({ req: ctx.req });
            console.log('session', session);

            if (!session) {
                return {
                    redirect: {
                        destination: '/signin',
                        permanent: false,
                    },
                };
            }

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