import { render, screen } from '@/jest.setup';
import Link from '@components/ui/Link';

describe('<Link />', () => {
    it('Renders success variant without error', async () => {
        render(<Link href="https://www.test.com">Test</Link>);

        const link = screen.getByText('Test');

        expect(link).toBeInTheDocument();
    });

    it('Renders w/ no link style prop', async () => {
        render(
            <Link href="https://www.test.com" noLinkStyle>
                Test
            </Link>
        );

        const link = document.querySelector('.css-0');

        screen.debug();

        expect(link).toBeInTheDocument();
    });
});
