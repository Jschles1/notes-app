import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Head from 'next/head';
import Header from './Header';
import { selectUser } from '../../store/auth/selectors';

type Props = {
    children?: ReactNode;
};

const Layout = ({ children }: Props) => {
    const router = useRouter();
    const user = useSelector(selectUser);

    const isLoggedIn = !!user;
    const centeredLayoutRoutes = ['/create-folder'];
    const isCentered = !isLoggedIn || centeredLayoutRoutes.includes(router.pathname);

    const renderContent = () => {
        const styles = {
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 4,
            paddingRight: 4,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
        };

        return isCentered ? (
            <Box sx={styles}>{children}</Box>
        ) : (
            <Box sx={styles}>
                <Box sx={{ width: '100%', height: '100%' }}>{children}</Box>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Head>
                <title>Next Notes</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Header isLoggedIn={isLoggedIn} />
            {renderContent()}
        </Box>
    );
};

export default Layout;
