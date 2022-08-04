import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import NoteDetail from '@components/notes/NoteDetail';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import fetcher from '@lib/graphql/fetcher';
import * as Mutations from '@lib/graphql/mutations';

jest.mock('@lib/hooks/useMediaQuery');
jest.mock('@lib/graphql/fetcher');

const note = {
    _id: '234',
    name: 'Note Name',
    description: 'Note Description',
    folder: '123',
    createdAt: '1649370960451',
    updatedAt: '1649370960451',
};

// const spy = jest.spyOn(Mutations, 'UPDATE_FOLDER_MUTATION');

describe('<NoteDetail />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/[noteId]']);
        mockRouter.setCurrentUrl('/folders/123/notes/234');

        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));

        (fetcher as jest.Mock).mockImplementation(() => ({
            updateNote: {
                code: 200,
                success: true,
                message: 'success',
            },
            deleteNote: {
                code: 200,
                success: true,
                message: 'success',
            },
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Renders desktop version without error', async () => {
        render(<NoteDetail note={note} folderId={note.folder} noteId={note._id} />);

        await waitFor(() => {
            expect(screen.getAllByText('Note Name').length).toEqual(2);
            expect(screen.getByText('Note Description', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('Update')).toBeInTheDocument();
            expect(screen.getByText('Delete')).toBeInTheDocument();
            expect(screen.getByLabelText('Rich Text Editor')).toBeInTheDocument();
            expect(document.querySelector('.ck-read-only')).toBeInTheDocument();
            expect(screen.getByTestId('arrow')).toBeInTheDocument();
        });
    });

    it('Renders mobile version without error', async () => {
        (useMediaQuery as jest.Mock).mockImplementationOnce(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        render(<NoteDetail note={note} folderId={note.folder} noteId={note._id} />);

        await waitFor(() => {
            expect(screen.getAllByText('Note Name').length).toEqual(1);
            expect(screen.getByText('Note Description', { exact: false })).toBeInTheDocument();
            expect(screen.getByText('Update')).toBeInTheDocument();
            expect(screen.getByText('Delete')).toBeInTheDocument();
            expect(screen.getByLabelText('Rich Text Editor')).toBeInTheDocument();
            expect(document.querySelector('.ck-read-only')).toBeInTheDocument();
            expect(screen.queryByTestId('arrow')).not.toBeInTheDocument();
        });
    });

    it('Opens <NoteEditor /> upon clicking "Update" button', async () => {
        render(<NoteDetail note={note} folderId={note.folder} noteId={note._id} />);

        await waitFor(() => {
            expect(screen.getByLabelText('Rich Text Editor')).toBeInTheDocument();
            expect(document.querySelector('.ck-read-only')).toBeInTheDocument();
        });

        const updateButton = screen.getByText('Update');
        await fireEvent.click(updateButton);

        await waitFor(() => {
            expect(document.querySelector('.ck-read-only')).not.toBeInTheDocument();
        });
    });

    it('Calls onSubmit when submitting updated note', async () => {
        const spy = jest.spyOn(Mutations, 'UPDATE_NOTE_MUTATION');
        render(<NoteDetail note={note} folderId={note.folder} noteId={note._id} />);

        await waitFor(() => {
            expect(screen.getByLabelText('Rich Text Editor')).toBeInTheDocument();
            expect(document.querySelector('.ck-read-only')).toBeInTheDocument();
        });

        const updateButton = screen.getByText('Update');
        await fireEvent.click(updateButton);

        await waitFor(() => {
            expect(document.querySelector('.ck-read-only')).not.toBeInTheDocument();
        });

        const submitButton = screen.getByText('Submit');
        await fireEvent.click(submitButton);

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('Opens delete folder confirmation modal upon clicking "Delete" button', async () => {
        jest.setTimeout(8000);
        const spy = jest.spyOn(Mutations, 'DELETE_NOTE_MUTATION');
        render(<NoteDetail note={note} folderId={note.folder} noteId={note._id} />);

        expect(screen.queryByText('Delete Note?')).not.toBeInTheDocument();

        const deleteButton = screen.getByText('Delete');
        await fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Delete Note?')).toBeInTheDocument();
        });

        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        await fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Note?')).not.toBeInTheDocument();
        });

        await fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText('Delete Note?')).toBeInTheDocument();
        });

        const confirmButton = screen.getByText('Confirm');
        await fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });
});
