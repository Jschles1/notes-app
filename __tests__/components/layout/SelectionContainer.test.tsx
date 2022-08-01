import { render, screen } from '@/jest.setup';
import SelectionContainer from '@components/layout/SelectionContainer';

describe('<SelectionContainer />', () => {
    it('Renders without error', async () => {
        render(
            <SelectionContainer maxHeight="800px">
                <p>Hello World</p>
            </SelectionContainer>
        );

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
