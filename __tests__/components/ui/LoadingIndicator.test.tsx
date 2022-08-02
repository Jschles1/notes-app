import { render, screen } from '@/jest.setup';
import LoadingIndicator from '@components/ui/LoadingIndicator';

describe('<LoadingIndicator />', () => {
    it('Renders without error', () => {
        render(<LoadingIndicator />);

        const loader = screen.getByRole('progressbar');

        expect(loader).toBeInTheDocument();
    });
});
