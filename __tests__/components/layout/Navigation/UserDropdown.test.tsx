import { render, screen, fireEvent } from '@/jest.setup';
import UserDropdown from '@components/layout/Navigation/UserDropdown';
import 'next-router-mock/dynamic-routes';
import * as NextAuth from 'next-auth/react';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

const testUser = {
    name: 'admin',
    email: 'admin@email.com',
    image: 'https://lh3.googleusercontent.com/a/AATXAJzLlJXt90hZvSHUts5579HkWHGC5-o4xfGeaRk6=s96-c',
};

describe('<UserDropdown />', () => {
    beforeAll(() => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));
    });

    it("Renders component with user's name and profile image", () => {
        render(<UserDropdown user={testUser} />);

        const username = screen.getByText('admin');
        const button = screen.getByRole('button');
        const img = screen.getByRole('img');

        expect(username).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(img).toBeInTheDocument();
    });

    it('Signs out the user upon clicking "Sign out"', async () => {
        const signOut = jest.spyOn(NextAuth, 'signOut');
        render(<UserDropdown user={testUser} />);

        const button = screen.getByRole('button');

        await fireEvent.click(button);

        const signOutButton = screen.getByRole('menuitem');

        await fireEvent.click(signOutButton);

        expect(signOut).toHaveBeenCalled();
    });
});
