import { render, screen } from '@/jest.setup';
import OptionButton from '@components/ui/OptionButton';

describe('<OptionButton />', () => {
    it('Renders success variant without error', async () => {
        render(<OptionButton variant="success">Test</OptionButton>);

        const button = screen.getByText('Test');

        expect(window.getComputedStyle(button).backgroundColor).toBe('rgb(46, 125, 50)');
    });

    it('Renders warning variant without error', async () => {
        render(<OptionButton variant="warning">Test</OptionButton>);

        const button = screen.getByText('Test');

        expect(window.getComputedStyle(button).backgroundColor).toBe('rgb(211, 47, 47)');
    });
});
