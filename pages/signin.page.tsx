import { Box } from '@mui/system';
import { NextPage } from 'next';
import { signIn, getSession } from 'next-auth/react';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';

export const getServerSideProps = async (ctx): Promise<any> => {
    const session = await getSession({ req: ctx.req });

    if (session) {
        return {
            redirect: {
                destination: '/folders',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

const SignInPage: NextPage = (props) => {
    const handleSignIn = async () => {
        await signIn('google');
    };

    return (
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
                onClick={handleSignIn}
                sx={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 1,
                    marginBottom: 1,
                }}
            >
                Sign In w/ Google
            </Button>
        </Card>
    );
};

export default SignInPage;
