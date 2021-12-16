import { FC } from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default wrapper.withRedux(MyApp);