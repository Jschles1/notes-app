import { Box } from '@mui/system';
import { NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { wrapper } from '../store';

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async (ctx): Promise<any> => {
            const session = await getSession({ req: ctx.req });

            if (session) {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                };
            }

            return {
                props: {},
            };
        }
);

const SignInPage: NextPage = (props) => {
    // Test for next auth
    const googleTest = async () => {
        const profile = await signIn('google');
        console.log('profile', profile);
    };

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Sign In</h1>
            <button onClick={googleTest}>Google Test</button>
        </Layout>
    );
};

export default SignInPage;