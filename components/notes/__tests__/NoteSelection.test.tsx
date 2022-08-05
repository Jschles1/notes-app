import { render, screen, waitFor } from '@/jest.setup';
import NoteSelection from '@components/notes/NoteSelection';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { useFolders } from '@lib/graphql/hooks';
import { createGlobalStateStore } from '@store/index';

jest.mock('@lib/hooks/useMediaQuery');

const note = {
    _id: '234',
    name: 'Note Name',
    description: 'Note Description',
    folder: '123',
    createdAt: '1649370960451',
    updatedAt: '1649370960451',
};

const folderWithNoNotes = {
    _id: '123',
    name: 'Folder Name 2',
    user: '321',
    createdAt: '1649370960451',
    updatedAt: '1649370960451',
    notes: [],
};

const noResultsSearchQueryState = {
    updatingFolder: '',
    alert: {
        type: '',
        message: '',
    },
    searchQuery: 'Test query',
};

const updatingFolderState = {
    updatingFolder: 'Folder Name',
    alert: {
        type: '',
        message: '',
    },
    searchQuery: '',
};

describe('<NoteSelection />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/']);
        mockRouter.setCurrentUrl('/folders/123/notes/');

        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Renders desktop variant without error', () => {
        render(<NoteSelection />);

        expect(screen.getByText('Folder Name')).toBeInTheDocument();
        expect(screen.getByText(note.name)).toBeInTheDocument();
        expect(screen.getByText(note.description)).toBeInTheDocument();
        expect(screen.getByText('04/07/2022')).toBeInTheDocument();
        expect(screen.getByText('Add New Note')).toBeInTheDocument();
    });

    it('Renders mobile variant without error', () => {
        (useMediaQuery as jest.Mock).mockImplementationOnce(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        render(<NoteSelection />);

        expect(screen.getByText('Folder Name')).toBeInTheDocument();
        expect(screen.getByText(note.name)).toBeInTheDocument();
        expect(screen.getByText(note.description)).toBeInTheDocument();
        expect(screen.getByText('04/07/2022')).toBeInTheDocument();
        expect(screen.queryByText('Add New Note')).not.toBeInTheDocument();
    });

    it('Renders appropriate content when chosen folder has no notes', () => {
        (useFolders as jest.Mock).mockImplementationOnce(() => {
            return {
                folders: [folderWithNoNotes],
                selectedFolder: folderWithNoNotes,
                isLoading: false,
                revalidate: jest.fn(() => {}),
                error: null,
            };
        });

        render(<NoteSelection />);

        expect(screen.getByText('Folder Name 2')).toBeInTheDocument();
        expect(screen.queryByText(note.name)).not.toBeInTheDocument();
        expect(screen.queryByText(note.description)).not.toBeInTheDocument();
        expect(screen.queryByText('04/07/2022')).not.toBeInTheDocument();
        expect(screen.getByText('Add New Note')).toBeInTheDocument();
        expect(screen.getByText('No notes found.')).toBeInTheDocument();
    });

    it('Renders loading indicator when API is loading data', () => {
        (useFolders as jest.Mock).mockImplementationOnce(() => {
            return {
                folders: [],
                selectedFolder: null,
                isLoading: true,
                revalidate: jest.fn(() => {}),
                error: null,
            };
        });
        render(<NoteSelection />);

        expect(screen.queryByText('Folder Name')).not.toBeInTheDocument();
        expect(screen.queryByText(note.name)).not.toBeInTheDocument();
        expect(screen.queryByText(note.description)).not.toBeInTheDocument();
        expect(screen.queryByText('04/07/2022')).not.toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('Only shows notes that match search query if search query is present', async () => {
        const store = createGlobalStateStore(noResultsSearchQueryState);
        render(<NoteSelection />, store);

        expect(screen.getByText('Folder Name')).toBeInTheDocument();
        expect(screen.queryByText(note.name)).not.toBeInTheDocument();
        expect(screen.queryByText(note.description)).not.toBeInTheDocument();
        expect(screen.queryByText('04/07/2022')).not.toBeInTheDocument();
        expect(screen.getByText('No notes found.')).toBeInTheDocument();
        await store.dispatch({
            type: '@action.setSearchQuery',
            payload: 'Note Name',
        });

        await waitFor(() => {
            expect(screen.getByText(note.name)).toBeInTheDocument();
        });
    });

    it('Shows update folder form when updatingFolder state is present on mobile variant', async () => {
        (useMediaQuery as jest.Mock).mockImplementationOnce(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        const store = createGlobalStateStore(updatingFolderState);
        render(<NoteSelection />, store);

        await waitFor(() => {
            expect(screen.getByRole('textbox')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Folder Name')).toBeInTheDocument();
        });
    });
});
