import { NextPage } from 'next';
import Link from 'next/link';
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

const IndexPage: NextPage = () => (
    <Layout title="Home | Next.js + TypeScript Example">
        <h1>Hello Next.js 👋</h1>
        <p>
            <Link href="/about">
                <a>About</a>
            </Link>
        </p>
    </Layout>
);

export default IndexPage;