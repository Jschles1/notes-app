import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import NoteEditor from '@components/form/NoteEditor';

describe('<NoteEditor />', () => {
    it('Renders without error', async () => {
        render(<NoteEditor onSubmit={() => {}} />);

        await waitFor(() => {
            const noteEditorLabel = screen.getByText(/Rich Text Editor/i);
            const noteTitleInput = screen.getByPlaceholderText('Note Title');
            const noteEditorTextarea = screen.getByLabelText('Rich Text Editor, main');
            const submitButton = screen.getByText('Submit');

            expect(noteTitleInput).toBeInTheDocument();
            expect(noteEditorLabel).toBeInTheDocument();
            expect(noteEditorTextarea).toBeInTheDocument();
            expect(submitButton).toBeInTheDocument();
        });
    });

    it('Calls onSubmit when submitting form', async () => {
        const onSubmit = jest.fn();
        render(<NoteEditor onSubmit={onSubmit} />);

        await waitFor(async () => {
            const noteTitleInput = screen.getByPlaceholderText('Note Title');
            const submitButton = screen.getByText('Submit');

            await fireEvent.focus(noteTitleInput);
            await fireEvent.change(noteTitleInput, {
                target: {
                    value: 'Hello Note',
                },
            });
            await fireEvent.click(submitButton);

            expect(onSubmit).toHaveBeenCalled();
        });
    });

    it('Shows error when form submission fails validation', async () => {
        const onSubmit = jest.fn();
        render(<NoteEditor onSubmit={onSubmit} />);

        await waitFor(async () => {
            const noteTitleInput = screen.getByPlaceholderText('Note Title');
            const submitButton = screen.getByText('Submit');

            expect(noteTitleInput).toBeInTheDocument();

            await fireEvent.click(submitButton);

            expect(onSubmit).not.toHaveBeenCalled();
        });
    });
});
