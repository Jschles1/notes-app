import { NextPage } from 'next';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';
import { wrapper } from '../store';
import { setUser } from '../store/auth/reducer';

// Test dispatch
export const getStaticProps = wrapper.getStaticProps(
    (store) =>
        ({ preview }): any => {
            console.log(
                '2. Page.getStaticProps uses the store to dispatch things'
            );
            store.dispatch(setUser('Hello 2'));
        }
);

const IndexPage: NextPage = () => {
    // Test for next auth
    const googleTest = async () => {
        await signIn('google');
    };

    return (
        <Layout title="Home | Next.js + TypeScript Example">
            <h1>Hello Next.js 👋</h1>
            <p>
                <Link href="/about">
                    <a>About</a>
                </Link>
            </p>
            <button onClick={googleTest}>Google Test</button>
        </Layout>
    );
};

export default IndexPage;