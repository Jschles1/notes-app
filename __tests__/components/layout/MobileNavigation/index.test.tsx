import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import MobileNavigation from '@components/layout/MobileNavigation';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<MobileNavigation />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths([
            '/folders',
            '/folders/[folderId]/notes',
            '/folders/[folderId]/notes/[noteId]',
        ]);

        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));
    });

    it('Renders without error', () => {
        mockRouter.setCurrentUrl('/folders');

        render(<MobileNavigation />);

        const container = screen.getByTestId('mobile-nav-container');

        expect(container).toBeInTheDocument();
    });

    it('Shows search icon on folder detail page', () => {
        mockRouter.setCurrentUrl('/folders/123/notes');

        render(<MobileNavigation />);

        const search = screen.getByTestId('SearchIcon');

        expect(search).toBeInTheDocument();
    });

    it('Hides search icon when not on folder detail page', () => {
        mockRouter.setCurrentUrl('/folders');

        render(<MobileNavigation />);

        const search = screen.queryByTestId('SearchIcon');

        expect(search).not.toBeInTheDocument();
    });

    it('Opens navigation drawer upon clicking "..."', async () => {
        render(<MobileNavigation />);

        const button = screen.getByRole('button');

        await fireEvent.click(button);

        await waitFor(() => {
            const signOutButton = screen.getByText('Sign Out');
            expect(signOutButton).toBeInTheDocument();
        });
    });
});
