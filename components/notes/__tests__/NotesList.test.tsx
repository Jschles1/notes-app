import { render, screen } from '@/jest.setup';
import NotesList from '@components/notes/NotesList';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

const notes = [
    {
        _id: '234',
        name: 'Note Name',
        description: 'Note Description',
        folder: '123',
        createdAt: '1649370960451',
        updatedAt: '1649370960451',
    },
];

describe('<NotesList />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/[noteId]']);
        mockRouter.setCurrentUrl('/folders/123/notes/234');
    });

    it('Renders without error', () => {
        render(<NotesList notes={notes} />);

        expect(screen.getByText(notes[0].name)).toBeInTheDocument();
        expect(screen.getByText(notes[0].description)).toBeInTheDocument();
        expect(screen.getByText('04/07/2022')).toBeInTheDocument();
    });
});
