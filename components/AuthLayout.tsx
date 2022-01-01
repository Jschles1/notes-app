import React, { ReactNode } from 'react';
import { Box } from '@mui/system';
import Head from 'next/head';

type Props = {
    children?: ReactNode;
};

const AuthLayout = ({ children }: Props) => (
    <Box
        sx={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Head>
            <title>Sign In</title>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        {children}
    </Box>
);

export default AuthLayout;
