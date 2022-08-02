import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import Card from '@components/ui/Card';

describe('<Card />', () => {
    it('Renders without error', () => {
        render(
            <Card isButton isActive>
                Test
            </Card>
        );

        const card = screen.getByText('Test');

        screen.debug();

        expect(card).toBeInTheDocument();
    });

    it('Executes onClick function upon being clicked', async () => {
        const onClick = jest.fn();

        render(<Card onClick={onClick}>Test</Card>);

        const card = screen.getByText('Test');

        await fireEvent.click(card);

        expect(onClick).toHaveBeenCalled();
    });
});
