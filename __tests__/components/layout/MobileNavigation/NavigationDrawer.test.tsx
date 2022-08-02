import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import NavigationDrawer from '@components/layout/MobileNavigation/NavigationDrawer';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<NavigationDrawer />', () => {
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
        render(<NavigationDrawer open={true} onClose={() => {}} onDeleteFolderClick={() => {}} />);

        const signOutButton = screen.getByText('Sign Out');
        const yourFoldersButton = screen.getByText('Your Folders');
        const addFolderButton = screen.getByText('Add New Folder');
        const updateFolderButton = screen.queryByText('Update Folder');
        const deleteFolderButton = screen.queryByText('Delete Folder');

        expect(signOutButton).toBeInTheDocument();
        expect(yourFoldersButton).toBeInTheDocument();
        expect(addFolderButton).toBeInTheDocument();
        expect(updateFolderButton).not.toBeInTheDocument();
        expect(deleteFolderButton).not.toBeInTheDocument();
    });

    it('Renders no content when drawer is closed', () => {
        render(<NavigationDrawer open={false} onClose={() => {}} onDeleteFolderClick={() => {}} />);

        const signOutButton = screen.queryByText('Sign Out');
        const yourFoldersButton = screen.queryByText('Your Folders');
        const addFolderButton = screen.queryByText('Add New Folder');
        const updateFolderButton = screen.queryByText('Update Folder');
        const deleteFolderButton = screen.queryByText('Delete Folder');

        expect(signOutButton).not.toBeInTheDocument();
        expect(yourFoldersButton).not.toBeInTheDocument();
        expect(addFolderButton).not.toBeInTheDocument();
        expect(updateFolderButton).not.toBeInTheDocument();
        expect(deleteFolderButton).not.toBeInTheDocument();
    });

    it('Renders folder options on folder detail page', () => {
        mockRouter.setCurrentUrl('/folders/123/notes');

        render(<NavigationDrawer open={true} onClose={() => {}} onDeleteFolderClick={() => {}} />);

        const updateFolderButton = screen.getByText('Update Folder');
        const deleteFolderButton = screen.getByText('Delete Folder');

        expect(updateFolderButton).toBeInTheDocument();
        expect(deleteFolderButton).toBeInTheDocument();
    });

    it('Calls onClose function when tapping off of drawer', async () => {
        const onClose = jest.fn();
        render(
            <div>
                <button>Drawer Close Test</button>
                <NavigationDrawer open={true} onClose={onClose} onDeleteFolderClick={() => {}} />
            </div>
        );

        const button = screen.getByText('Drawer Close Test');

        await fireEvent.click(button);

        expect(onClose).toHaveBeenCalled();
    });

    it('Calls onDeleteFolderClick function tapping "Delete Folder"', async () => {
        const onDeleteFolderClick = jest.fn();
        render(<NavigationDrawer open={true} onClose={() => {}} onDeleteFolderClick={onDeleteFolderClick} />);

        const button = screen.getByText('Delete Folder');

        await fireEvent.click(button);

        expect(onDeleteFolderClick).toHaveBeenCalled();
    });
});
