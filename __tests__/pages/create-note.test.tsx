import { render, screen, waitFor } from '../../jest.setup';
import CreateNote from '../../pages/create-note';
import mockRouter from 'next-router-mock';

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
});
