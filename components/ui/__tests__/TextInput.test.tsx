import { render } from '@/jest.setup';
import TextInput from '@components/ui/TextInput';

describe('<TextInput />', () => {
    it('Renders white variant without error', async () => {
        render(<TextInput variant="white" />);

        const input = document.querySelector('.MuiOutlinedInput-root');

        expect(window.getComputedStyle(input).backgroundColor).toBe('rgb(255, 255, 255)');
    });

    it('Renders gray variant without error', async () => {
        render(<TextInput variant="gray" />);

        const input = document.querySelector('.MuiOutlinedInput-root');

        expect(window.getComputedStyle(input).backgroundColor).toBe('rgb(238, 238, 238)');
    });
});
