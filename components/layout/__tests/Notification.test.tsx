import { render, screen, waitFor, fireEvent, act } from '@/jest.setup';
import Notification from '@components/layout/Notification';
import { createGlobalStateStore } from '@store/index';

const initialSuccessState = {
    updatingFolder: '',
    alert: {
        type: 'success',
        message: 'Hello World',
    },
    searchQuery: '',
};

const initialErrorState = {
    updatingFolder: '',
    alert: {
        type: 'error',
        message: 'Hello World',
    },
    searchQuery: '',
};

describe('<Notification />', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
    });

    it('Renders no content when no alert is state provided', async () => {
        render(<Notification />);

        await waitFor(() => {
            const div = document.querySelector('body > div');
            expect(div.children.length).toEqual(0);
        });
    });

    it('Renders a notification when success alert state is provided, then disappears after 5 seconds', async () => {
        const store = createGlobalStateStore(initialSuccessState);

        render(<Notification />, store);

        const notification = screen.getByText('Hello World');

        await waitFor(() => {
            expect(notification).toBeInTheDocument();
        });

        act(() => {
            jest.runAllTimers();
        });

        expect(notification).not.toBeInTheDocument();
    });

    it('Renders a notification when error alert state is provided, but only disappears after user click', async () => {
        const store = createGlobalStateStore(initialErrorState);

        render(<Notification />, store);

        const notification = screen.getByText('Hello World');

        await waitFor(async () => {
            expect(notification).toBeInTheDocument();

            await setTimeout(() => Promise.resolve(), 5000);

            expect(notification).toBeInTheDocument();

            const closeButton = screen.getByLabelText('Close');

            await fireEvent.click(closeButton);

            expect(notification).not.toBeInTheDocument();
        });
    });
});
