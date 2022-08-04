import { render, screen, waitFor } from '@/jest.setup';
import CreateNote from '@pages/create-note.page';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import { useFolders } from '@lib/graphql/hooks';

describe('/create-note Page', () => {
    beforeEach(() => {
        mockRouter.setCurrentUrl('/create-note?folderId=123');
    });

    it('Renders without error', async () => {
        render(<CreateNote />);

        await waitFor(() => {
            const title = screen.getByText(/Submit/i);

            expect(title).toBeInTheDocument();
        });
    });

    it('Shows loading indicator when waiting for API response', async () => {
        (useFolders as jest.Mock).mockImplementationOnce(() => {
            return {
                folders: [],
                selectedFolder: null,
                isLoading: true,
                revalidate: jest.fn(() => {}),
                error: null,
            };
        });

        render(<CreateNote />);

        const title = screen.queryByText(/Submit/i);

        expect(title).not.toBeInTheDocument();
    });
});
