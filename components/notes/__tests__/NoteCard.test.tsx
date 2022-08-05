import { render, screen } from '@/jest.setup';
import NoteCard from '@components/notes/NoteCard';

const note = {
    _id: '234',
    name: 'Note Name',
    description: 'Note Description',
    folder: '123',
    createdAt: '1649370960451',
    updatedAt: '1649370960451',
};

describe('<NoteCard />', () => {
    it('Renders without error', () => {
        render(
            <NoteCard
                folderId={note.folder}
                noteId={note._id}
                name={note.name}
                description={note.description}
                updatedAt={note.updatedAt}
            />
        );

        expect(screen.getByText(note.name)).toBeInTheDocument();
        expect(screen.getByText(note.description)).toBeInTheDocument();
        expect(screen.getByText('04/07/2022')).toBeInTheDocument();
    });
});
