import { render, screen } from '@/jest.setup';
import MobileUserInfo from '@components/layout/MobileNavigation/MobileUserInfo';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

const testUser = {
    name: 'admin',
    email: 'admin@email.com',
    image: 'https://lh3.googleusercontent.com/a/AATXAJzLlJXt90hZvSHUts5579HkWHGC5-o4xfGeaRk6=s96-c',
};

describe('<MobileUserInfo />', () => {
    beforeAll(() => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));
    });

    it("Renders component with user's name and profile image", () => {
        render(<MobileUserInfo user={testUser} />);

        const username = screen.getByText('admin');
        const img = screen.getByRole('img');

        expect(username).toBeInTheDocument();
        expect(img).toBeInTheDocument();
    });
});
