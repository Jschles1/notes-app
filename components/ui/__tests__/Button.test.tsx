import { render, screen } from '@/jest.setup';
import Button from '@components/ui/Button';

describe('<Button />', () => {
    it('Renders without error', () => {
        render(<Button>Test</Button>);

        const button = screen.getByText('Test');

        expect(button).toBeInTheDocument();
    });
});
