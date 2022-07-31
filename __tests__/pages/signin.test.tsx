import { render, screen } from '@testing-library/react';
import Signin, { getServerSideProps } from '../../pages/signin';
import { getSession } from 'next-auth/react';
import { getPage } from 'next-page-tester';
import { App, Page } from '@lib/wrapper';

describe('/signin Page', () => {
    it('Renders without error', () => {
        render(<Signin />);

        const title = screen.getByText(/Welcome! Please Sign In./i);

        expect(title).toBeInTheDocument();
    });

    it('getServerSideProps redirects user if already logged in', async () => {
        const hasSession = await getServerSideProps({});
        expect(hasSession).toHaveProperty('redirect.destination', '/folders');
        expect(hasSession).toHaveProperty('redirect.permanent', false);

        (getSession as jest.Mock).mockReturnValueOnce(null);
        const noSession = await getServerSideProps({});
        expect(noSession).toHaveProperty('props', {});
    });
});
