import { render, screen } from '@/jest.setup';
import Skeleton from '@components/ui/Skeleton';
import { useFolders } from '@lib/graphql/hooks';

describe('<Skeleton />', () => {
    it('Renders skeleton when loading state is true', async () => {
        (useFolders as jest.Mock).mockImplementationOnce(() => {
            return {
                folders: [],
                selectedFolder: null,
                isLoading: true,
                revalidate: jest.fn(() => {}),
                error: null,
            };
        });

        render(
            <Skeleton>
                <p>Test</p>
            </Skeleton>
        );

        const skeleton = document.querySelector('.MuiSkeleton-root');
        const text = screen.queryByText('Test');

        expect(skeleton).toBeInTheDocument();
        expect(text).not.toBeInTheDocument();
    });

    it('Only renders children when loading state is false', async () => {
        render(
            <Skeleton>
                <p>Test</p>
            </Skeleton>
        );

        const skeleton = document.querySelector('.MuiSkeleton-root');
        const text = screen.getByText('Test');

        expect(skeleton).not.toBeInTheDocument();
        expect(text).toBeInTheDocument();
    });
});
