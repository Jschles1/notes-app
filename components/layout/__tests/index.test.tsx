import { render, screen, waitFor } from '@/jest.setup';
import Layout from '@components/layout';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<Layout />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes']);

        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));
    });

    afterAll(() => {
        (useMediaQuery as jest.Mock).mockClear();
    });

    it('Renders without error', () => {
        render(<Layout />);

        const container = screen.getByTestId('layout');
        expect(container).toBeInTheDocument();
    });

    it('Renders correct metadata inside <head> tag', async () => {
        render(<Layout />);

        await waitFor(() => {
            const utfMeta = document.querySelector('[charset="utf-8"]');
            const viewportMeta = document.querySelector(
                '[name="viewport"][content="initial-scale=1.0, width=device-width"]'
            );
            expect(document.title).toEqual('Next Notes');
            expect(utfMeta).toBeInTheDocument();
            expect(viewportMeta).toBeInTheDocument();
        });
    });

    it('Renders the desktop layout on desktop screen sizes', async () => {
        render(<Layout />);

        await waitFor(() => {
            expect(screen.getByTestId('desktop-nav-container')).toBeInTheDocument();
        });
    });

    it('Renders the mobile layout on mobile device', async () => {
        (useMediaQuery as jest.Mock).mockImplementationOnce(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        render(<Layout />);

        await waitFor(() => {
            expect(screen.getByTestId('mobile-nav-container')).toBeInTheDocument();
        });
    });

    it('Renders normal layout on required pages', () => {
        mockRouter.setCurrentUrl('/folders');

        render(<Layout />);

        expect(screen.getByTestId('app-layout')).toBeInTheDocument();
    });

    it('Renders centered layout on required pages', () => {
        mockRouter.setCurrentUrl('/signin');

        render(<Layout />);

        expect(screen.getByTestId('centered-layout')).toBeInTheDocument();
    });

    it('Renders <NoteSelection /> on notes desktop page', async () => {
        mockRouter.setCurrentUrl('/folders/123/notes');

        render(<Layout />);

        await waitFor(() => {
            const folderNameElements = screen.getAllByText(/Folder Name/i);
            const addButton = screen.getByText(/Add New Note/i);

            expect(folderNameElements.length).toEqual(2);
            expect(addButton).toBeInTheDocument();
        });
    });
});
