import { render, screen, waitFor } from '@/jest.setup';
import Breadcrumbs from '@components/layout/Breadcrumbs';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

describe('<Breadcrumbs />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/[noteId]']);
    });

    it('Renders without error', async () => {
        mockRouter.setCurrentUrl('/folders/123/notes/234');

        render(<Breadcrumbs />);

        const folderName = screen.getByText(/Folder Name/i);
        const arrow = screen.getByTestId('arrow');
        const noteName = screen.getByText(/Note Name/i);

        await waitFor(() => {
            expect(folderName).toBeInTheDocument();
            expect(arrow).toBeInTheDocument();
            expect(noteName).toBeInTheDocument();
        });
    });
});
