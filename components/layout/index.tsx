import * as React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import Head from 'next/head';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';

const Navigation = dynamic(() => import('./Navigation'));
const MobileNavigation = dynamic(() => import('./MobileNavigation'));
const NoteSelection = dynamic(() => import('../notes/NoteSelection'));
const Notification = dynamic(() => import('./Notification'));

interface Props {
    children?: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
    const router = useRouter();
    const { user } = useLoggedInUser();
    const { isDesktop } = useMediaQuery();

    const isLoggedIn = !!user;
    const isNotePage = router.pathname.includes('/notes') || router.pathname === '/create-note';

    const isCenteredLayout =
        (!isDesktop && ['/create-folder'].includes(router.pathname)) || ['/signin'].includes(router.pathname);

    return (
        <Box data-testid="layout">
            <Head>
                <title>Next Notes</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Box>{!isDesktop && isLoggedIn ? <MobileNavigation /> : null}</Box>
            <Box
                sx={[
                    {
                        height: !isDesktop ? 'calc(100vh - 56px)' : '100vh',
                        display: !isDesktop ? 'block' : 'flex',
                        maxWidth: !isDesktop ? '100vw' : '1440px',
                        margin: '0 auto',
                        overflow: 'hidden',
                        position: 'relative',
                    },
                    isCenteredLayout
                        ? {
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                          }
                        : {},
                ]}
                data-testid={isCenteredLayout ? 'centered-layout' : 'app-layout'}
            >
                {isLoggedIn && isDesktop ? (
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
