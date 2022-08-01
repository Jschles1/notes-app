import { render, screen } from '@/jest.setup';
import EditorContainer from '@components/layout/EditorContainer';

describe('<EditorContainer />', () => {
    it('Renders without error', async () => {
        render(
            <EditorContainer maxHeight="800px">
                <p>Hello World</p>
            </EditorContainer>
        );

        expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
});
