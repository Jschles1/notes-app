import { render, screen, waitFor } from '../../../../../jest.setup';
import FolderDetailPage from '../../../../../pages/folders/[folderId]/notes/index';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

describe('/folders/[folderId]/notes Page', () => {
    beforeEach(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes']);
        mockRouter.setCurrentUrl('/folders/123/notes');
    });
    it('Renders without error', async () => {
        render(<FolderDetailPage />);

        await waitFor(() => {
            const folder = screen.getByText(/Folder Name/i);

            expect(folder).toBeInTheDocument();
        });
    });
});
