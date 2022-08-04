import { render, screen } from '@/jest.setup';
import ProfileImage from '@components/ui/ProfileImage';

const testImage = 'https://lh3.googleusercontent.com/a/AATXAJzLlJXt90hZvSHUts5579HkWHGC5-o4xfGeaRk6=s96-c';

describe('<ProfileImage />', () => {
    it('Renders without error', async () => {
        render(<ProfileImage imageSrc={testImage} />);

        const img = screen.getByRole('img');

        expect(img).toBeInTheDocument();
    });
});
