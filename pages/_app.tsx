import * as React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { StoreProvider } from 'easy-peasy';
import store from '@store/index';
import theme from '@lib/theme';
import Layout from '@components/layout';

const globalStyles = (
    <GlobalStyles
        styles={(theme: Theme) => ({
            body: {
                background: `linear-gradient(180deg, ${theme.palette.primary.light} 1%, ${theme.palette.secondary.light} 100%)`,
                backgroundColor: theme.palette.primary.light,
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                color: theme.palette.primary.main,
            },
        })}
    />
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}
            <SessionProvider session={pageProps.session}>
                <StoreProvider store={store}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </StoreProvider>
            </SessionProvider>
        </ThemeProvider>
    );
};

// export default wrapper.withRedux(MyApp);
export default MyApp;
