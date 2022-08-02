import { render, screen } from '@/jest.setup';
import AddButton from '@components/ui/AddButton';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

describe('<AddButton />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders', '/folders/[folderId]/notes']);
    });

    it('Renders add folder button without error', () => {
        mockRouter.setCurrentUrl('/folders');
        render(<AddButton resource="folder" />);

        const button = screen.getByText('Add New Folder');
        const href = button.parentElement.getAttribute('href');

        expect(button).toBeInTheDocument();
        expect(href).toBe('/create-folder');
    });

    it('Renders add note button without error', () => {
        mockRouter.setCurrentUrl('/folders/123/notes');
        render(<AddButton resource="note" />);

        const button = screen.getByText('Add New Note');
        const href = button.parentElement.getAttribute('href');

        expect(button).toBeInTheDocument();
        expect(href).toBe('/create-note?folderId=123');
    });
});
