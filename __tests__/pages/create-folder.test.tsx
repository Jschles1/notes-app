import { render, screen } from '../../jest.setup';
import CreateFolder from '../../pages/create-folder';

describe('/create-folder Page', () => {
    it('Renders without error', () => {
        render(<CreateFolder />);

        const title = screen.getByText(/Create a New Folder:/i);

        expect(title).toBeInTheDocument();
    });
});
