import { render, screen } from '@/jest.setup';
import Navigation from '@components/layout/Navigation';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<Navigation />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths([
            '/folders',
            '/folders/[folderId]/notes',
            '/folders/[folderId]/notes/[noteId]',
        ]);

        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));
    });

    it('Only renders <UserDropdown /> and <AddButton /> on /folders page', () => {
        mockRouter.setCurrentUrl('/folders');

        render(<Navigation />);

        const userDropdown = screen.getByText('admin');
        const addButton = screen.getByText('Add New Folder');
        const search = screen.queryByPlaceholderText('Search Notes');
        const folderListTitle = screen.queryByText('Your Folders:');

        expect(userDropdown).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(search).not.toBeInTheDocument();
        expect(folderListTitle).not.toBeInTheDocument();
    });

    it('Renders all components when not on /folders page', () => {
        mockRouter.setCurrentUrl('/folders/123/notes');

        render(<Navigation />);

        const userDropdown = screen.getByText('admin');
        const addButton = screen.getByText('Add New Folder');
        const search = screen.getByPlaceholderText('Search Notes');
        const folderListTitle = screen.getByText('Your Folders:');

        expect(userDropdown).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(search).toBeInTheDocument();
        expect(folderListTitle).toBeInTheDocument();
    });
});
