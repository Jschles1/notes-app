import { render, screen } from '@/jest.setup';
import MobileBreadcrumbs from '@components/layout/MobileNavigation/MobileBreadcrumbs';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<MobileBreadcrumbs />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/[noteId]']);

        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));
    });

    it('Renders without error', () => {
        mockRouter.setCurrentUrl('/folders/123/notes/234');
        render(<MobileBreadcrumbs />);

        const folderTitle = screen.getByText('Folder Name');

        expect(folderTitle).toBeInTheDocument();
    });
});
