import { FC } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { wrapper } from '../store';
import theme from '../lib/theme';

const globalStyles = (
    <GlobalStyles
        styles={(theme) => ({
            body: {
                background: 'linear-gradient(180deg, #AFCDE9 1%, #F7FBE7 100%)',
                backgroundColor: '#AFCDE9',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                color: '#253449',
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
