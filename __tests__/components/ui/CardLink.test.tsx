import { render, screen, fireEvent } from '@/jest.setup';
import CardLink from '@components/ui/CardLink';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';

describe('<CardLink />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders', '/folders/[folderId]/notes']);
    });

    it('Renders without error', () => {
        render(<CardLink href="/hello">Test</CardLink>);

        const card = screen.getByText('Test');

        expect(card).toBeInTheDocument();
    });

    it('Renders with active style if link href is current page', () => {
        mockRouter.setCurrentUrl('/folders');

        render(<CardLink href="/folders">Test</CardLink>);

        const card = screen.getByText('Test');

        expect(window.getComputedStyle(card).color).toBe('rgb(255, 255, 255)');
    });
});
