import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';
import Head from 'next/head';
import { selectUser } from '@store/auth/selectors';
import Navigation from './Navigation';
import NoteSelection from '../notes/NoteSelection';
import Notification from './Notification';
import MobileNavigation from './MobileNavigation';
import useMediaQuery from '@lib/hooks/useMediaQuery';

interface Props {
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const user = useSelector(selectUser);
    const { isMobile } = useMediaQuery();

    const isLoggedIn = !!user;
    const isNotePage =
        router.pathname.includes('/notes') ||
        router.pathname === '/create-note';

    const isCenteredMobileLayout =
        isMobile && ['/create-folder', '/signin'].includes(router.pathname);

    return (
        <Box>
            <Head>
                <title>Next Notes</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
            </Head>
            <Box>{isMobile && isLoggedIn ? <MobileNavigation /> : null}</Box>
            <Box
                sx={[
                    {
                        height: isMobile ? 'calc(100vh - 56px)' : '100vh',
                        display: isMobile ? 'block' : 'flex',
                        maxWidth: '100vw',
                        overflow: 'hidden',
                        position: 'relative',
                    },
                    isCenteredMobileLayout
                        ? {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                          }
                        : {},
                ]}
            >
                {isLoggedIn && !isMobile ? (
                    <>
                        <Navigation />
                        {isNotePage && <NoteSelection />}
                        {children}
                    </>
                ) : (
                    <>{children}</>
                )}
                <Notification />
            </Box>
        </Box>
    );
};

export default Layout;