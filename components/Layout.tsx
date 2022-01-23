import React, { ReactNode } from 'react';
import { Box } from '@mui/system';
import Head from 'next/head';
import Header from './Header';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
    <Box
        sx={{
            height: '100vh',
        }}
    >
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Header />
        <Box sx={{ padding: 2 }}>{children}</Box>
    </Box>
);

export default Layout;
