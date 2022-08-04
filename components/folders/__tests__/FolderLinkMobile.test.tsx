import { render, screen } from '@/jest.setup';
import FolderLinkMobile from '@components/folders/FolderLinkMobile';
import 'next-router-mock/dynamic-routes';
import useMediaQuery from '@lib/hooks/useMediaQuery';

jest.mock('@lib/hooks/useMediaQuery');

describe('<FolderLinkMobile />', () => {
    beforeAll(() => {
        (useMediaQuery as jest.Mock).mockImplementation(() => ({
            isDesktop: false,
            isTablet: false,
            isMobile: true,
        }));
    });

    it('Renders without error', () => {
        render(<FolderLinkMobile _id="123" name="Folder Name" />);

        expect(screen.getByText('Folder Name')).toBeInTheDocument();
        expect(document.querySelector('a[href="/folders/123/notes"]')).toBeInTheDocument();
    });
});
