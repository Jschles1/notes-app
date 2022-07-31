import { render, screen, waitFor } from '@/jest.setup';
import FoldersPage from '@pages/folders';

describe('/folders Page', () => {
    it('Renders without error', async () => {
        render(<FoldersPage />);

        await waitFor(() => {
            const title = screen.getByText(/Your Folders:/i);

            expect(title).toBeInTheDocument();
        });
    });
});
