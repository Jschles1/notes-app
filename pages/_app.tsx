import { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider, Theme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { wrapper } from '../store';
import theme from '../lib/theme';

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

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {globalStyles}
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default wrapper.withRedux(MyApp);
