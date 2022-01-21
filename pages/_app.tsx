import { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { wrapper } from '../store';
import theme from '../lib/theme';

const globalStyles = (
    <GlobalStyles
        styles={(theme) => ({
            body: { backgroundColor: '#0B0C10', color: '#C5C6C7' },
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
