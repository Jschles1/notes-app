import { render, screen } from '@/jest.setup';
import FoldersList from '@components/folders/FoldersList';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<FoldersList />', () => {
    beforeAll(() => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: true,
            isTablet: false,
            isMobile: false,
        }));
    });

    it('Renders desktop variant without error', () => {
        render(<FoldersList />);

        screen.debug();

        const title = screen.getByText('Your Folders:');
        const folder = screen.getByText('Folder Name');

        expect(title).toBeInTheDocument();
        expect(folder).toBeInTheDocument();
    });

    it('Renders desktop variant without error when isNav prop is passed', () => {
        render(<FoldersList isNav />);

        screen.debug();

        const title = screen.getByText('Your Folders:');
        const folder = screen.getByText('Folder Name');

        expect(title).toBeInTheDocument();
        expect(folder).toBeInTheDocument();
    });

    it('Renders tablet variant without error', () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: true,
            isMobile: false,
        }));
        render(<FoldersList />);

        screen.debug();

        const title = screen.getByText('Your Folders:');
        const folder = screen.getByText('Folder Name');

        expect(title).toBeInTheDocument();
        expect(folder).toBeInTheDocument();
    });

    it('Renders mobile variant without error', () => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));
        render(<FoldersList />);

        screen.debug();

        const title = screen.getByText('Your Folders:');
        const folder = screen.getByText('Folder Name');

        expect(title).toBeInTheDocument();
        expect(folder).toBeInTheDocument();
    });
});
