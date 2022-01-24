import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { wrapper } from '../store';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx): Promise<any> => {
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
});

const SignInPage: NextPage = (props) => {
    // Test for next auth
    const googleTest = async () => {
        const profile = await signIn('google');
    };

    return (
        <Layout>
            <Card
                sx={{
                    width: 350,
                    paddingTop: 4,
                    paddingBottom: 4,
                }}
            >
                <Box
                    sx={{
                        textAlign: 'center',
                        color: 'primary.main',
                        marginBottom: 2,
                    }}
                >
                    Welcome! Please Sign In.
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={googleTest}
                    sx={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        marginTop: 1,
                        marginBottom: 1,
                        textTransform: 'unset',
                    }}
                >
                    Sign In w/ Google
                </Button>
            </Card>
        </Layout>
    );
};

export default SignInPage;
