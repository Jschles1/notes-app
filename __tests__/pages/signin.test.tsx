import { render, screen } from '@testing-library/react';
import Signin from '../../pages/signin';

describe('/signin Page', () => {
    it('Renders without error', () => {
        render(<Signin />);

        const title = screen.getByText(/Welcome! Please Sign In./i);

        expect(title).toBeInTheDocument();
    });
});