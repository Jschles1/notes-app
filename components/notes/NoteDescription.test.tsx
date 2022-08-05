import { render, screen } from '@/jest.setup';
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
    it('Renders without error', () => {
        render(<NoteDescription value={note.description} />);

        // expect(screen.getByText(note.name)).toBeInTheDocument();
        // expect(screen.getByText(note.description)).toBeInTheDocument();
        // expect(screen.getByText('04/07/2022')).toBeInTheDocument();

        screen.debug();
    });
});
