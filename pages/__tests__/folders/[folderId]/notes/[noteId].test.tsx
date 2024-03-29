import { render, screen, waitFor } from '@/jest.setup';
import NoteDetailPage from '@pages/folders/[folderId]/notes/[noteId]';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

describe('/folders/[folderId]/notes/[noteId] Page', () => {
    beforeEach(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/[noteId]']);
        mockRouter.setCurrentUrl('/folders/123/notes/234');
    });
    it('Renders without error', async () => {
        render(<NoteDetailPage />);

        await waitFor(() => {
            const noteTitle = screen.getAllByText(/Note Name/i);
            const noteDescription = screen.getByText(/Note Description/i);
            const noteEditorLabel = screen.getByText(/Rich Text Editor/i);

            expect(noteTitle.length).toEqual(1);
            expect(noteDescription).toBeInTheDocument();
            expect(noteEditorLabel).toBeInTheDocument();
        });
    });
});
