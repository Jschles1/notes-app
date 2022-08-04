import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import CreateFolderForm from '@components/form/CreateFolderForm';

describe('<CreateFolderForm />', () => {
    it('Renders without error', () => {
        render(<CreateFolderForm onSubmit={() => {}} />);

        const title = screen.getByText('Create a New Folder:');

        expect(title).toBeInTheDocument();
    });

    it('Calls onSubmit on form submission', async () => {
        const onSubmit = jest.fn();
        render(<CreateFolderForm onSubmit={onSubmit} />);

        const input = screen.getByTestId('f-form');
        const submitButton = screen.getByText('Submit');

        await fireEvent.focus(input);
        await fireEvent.change(input, {
            target: {
                value: 'Hello',
            },
        });
        await fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
            expect(onSubmit).toHaveBeenCalled();
        });
    });

    it('Shows error on validation failure', async () => {
        const onSubmit = jest.fn();
        render(<CreateFolderForm onSubmit={onSubmit} />);

        const submitButton = screen.getByText('Submit');

        await fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Folder Name is required.')).toBeInTheDocument();
            expect(onSubmit).not.toHaveBeenCalled();
        });
    });
});
