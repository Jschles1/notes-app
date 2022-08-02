import { render, screen, fireEvent } from '@/jest.setup';
import DeleteConfirmationModal from '@components/ui/DeleteConfirmationModal';

const onClose = jest.fn();
const onConfirm = jest.fn();

describe('<DeleteConfirmationModal />', () => {
    it('Renders delete folder confirmation modal without error', () => {
        render(
            <DeleteConfirmationModal type="Folder" name="Folder Name" open onClose={onClose} onConfirm={onConfirm} />
        );

        const h2 = screen.getByText('Delete Folder?');
        const prompt = screen.getByText('Folder Name', { exact: false });
        const confirmButton = screen.getByText('Confirm');
        const cancelButton = screen.getByText('Cancel');

        expect(h2).toBeInTheDocument();
        expect(prompt).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('Renders delete note confirmation modal without error', () => {
        render(<DeleteConfirmationModal type="Note" name="Note Name" open onClose={onClose} onConfirm={onConfirm} />);

        const h2 = screen.getByText('Delete Note?');
        const prompt = screen.getByText('Note Name', { exact: false });
        const confirmButton = screen.getByText('Confirm');
        const cancelButton = screen.getByText('Cancel');

        expect(h2).toBeInTheDocument();
        expect(prompt).toBeInTheDocument();
        expect(confirmButton).toBeInTheDocument();
        expect(cancelButton).toBeInTheDocument();
    });

    it('Renders no content when modal is not set to open', () => {
        render(
            <DeleteConfirmationModal
                type="Note"
                name="Note Name"
                open={false}
                onClose={onClose}
                onConfirm={onConfirm}
            />
        );

        const div = document.querySelector('div');

        expect(div.children.length).toBe(0);
    });

    it('Calls onClose upon clicking cancel button', async () => {
        render(
            <DeleteConfirmationModal type="Folder" name="Folder Name" open onClose={onClose} onConfirm={onConfirm} />
        );

        const cancelButton = screen.getByText('Cancel');

        await fireEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalled();
    });

    it('Calls onConfirm upon clicking confirm button', async () => {
        render(
            <DeleteConfirmationModal type="Folder" name="Folder Name" open onClose={onClose} onConfirm={onConfirm} />
        );

        const confirmButton = screen.getByText('Confirm');

        await fireEvent.click(confirmButton);

        expect(onConfirm).toHaveBeenCalled();
    });
});
