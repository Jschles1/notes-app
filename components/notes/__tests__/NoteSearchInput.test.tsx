import { render, screen, waitFor, fireEvent } from '@/jest.setup';
import NoteSearchInput from '@components/notes/NoteSearchInput';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<NoteSearchInput />', () => {
    beforeAll(() => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));
    });

    it('Renders desktop variant without error', () => {
        render(<NoteSearchInput />);

        expect(screen.getByPlaceholderText('Search Notes')).toBeInTheDocument();
    });

    it('Renders mobile variant without error', () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        render(<NoteSearchInput />);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.queryByPlaceholderText('Search Notes')).not.toBeInTheDocument();
    });

    it('Opens search input upon clicking search icon on mobile variant', async () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));

        render(<NoteSearchInput />);

        const button = screen.getByRole('button');

        await fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByPlaceholderText('Search Notes')).toBeInTheDocument();
        });

        const closeButton = screen.getByTestId('CloseIcon');

        await fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByPlaceholderText('Search Notes')).not.toBeInTheDocument();
        });
    });

    it('Sets search query in store on input change', async () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));

        render(<NoteSearchInput />);

        const input = screen.queryByPlaceholderText('Search Notes');

        await fireEvent.change(input, {
            target: {
                value: 'Hello',
            },
        });

        await waitFor(() => {
            expect(screen.getByDisplayValue('Hello')).toBeInTheDocument();
        });
    });
});
