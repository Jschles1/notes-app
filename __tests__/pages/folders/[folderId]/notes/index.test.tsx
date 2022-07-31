import { render, screen, waitFor } from '@/jest.setup';
import FolderDetailPage from '@pages/folders/[folderId]/notes/index';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('/folders/[folderId]/notes Page', () => {
    beforeEach(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes']);
        mockRouter.setCurrentUrl('/folders/123/notes');
    });

    afterAll(() => {
        (useMediaQuery as jest.Mock).mockClear();
    });

    it('Renders page content on mobile device', async () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        render(<FolderDetailPage />);

        await waitFor(() => {
            const folder = screen.getByText(/Folder Name/i);
            const addButton = screen.getByText(/Add New Note/i);

            expect(folder).toBeInTheDocument();
            expect(addButton).toBeInTheDocument();
        });
    });

    it('Renders no page content on desktop device', async () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));

        render(<FolderDetailPage />);

        await waitFor(() => {
            const div = document.querySelector('body > div');
            expect(div.children.length).toEqual(0);
        });
    });
});
