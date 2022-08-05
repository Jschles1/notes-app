import { render, screen, waitFor } from '@/jest.setup';
import NoteDescription from '@components/notes/NoteDescription';

const note = {
    _id: '234',
    name: 'Note Name',
    description: 'Note Description',
    folder: '123',
    createdAt: '1649370960451',
    updatedAt: '1649370960451',
};

describe('<NoteDescription />', () => {
    it('Renders without error', async () => {
        render(<NoteDescription value={note.description} />);

        await waitFor(() => {
            expect(screen.getByText(note.description, { exact: false }));
        });
    });
});