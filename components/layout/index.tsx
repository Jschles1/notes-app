import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Head from 'next/head';
import { selectUser } from '../../store/auth/selectors';
import Navigation from './Navigation';
import NoteSelection from '../notes/NoteSelection';

interface Props {
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const user = useSelector(selectUser);

    const isLoggedIn = !!user;
    const isNotePage = router.pathname.includes('/notes') || router.pathname === '/create-note';

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                maxWidth: '100vw',
                overflowX: 'hidden',
            }}
        >
            <Head>
                <title>Next Notes</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {isLoggedIn ? (
                <>
                    <Navigation />
                    {isNotePage && <NoteSelection />}
                    {children}
                </>
            ) : (
                <>{children}</>
            )}
        </Box>
    );
};

export default Layout;
