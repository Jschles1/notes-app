import { render, screen, fireEvent, waitFor } from '@/jest.setup';
import UpdateFolderForm from '@components/form/UpdateFolderForm';
import * as Mutations from '@lib/graphql/mutations';

describe('<UpdateFolderForm />', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Renders without error', () => {
        render(<UpdateFolderForm name="Folder Name" id="123" />);

        const input = screen.getByDisplayValue('Folder Name');

        expect(input).toBeInTheDocument();
    });

    it('Calls onSubmit upon form submission', async () => {
        const spy = jest.spyOn(Mutations, 'UPDATE_FOLDER_MUTATION');
        render(<UpdateFolderForm name="Folder Name" id="123" />);

        const input = screen.getByDisplayValue('Folder Name');

        expect(input).toBeInTheDocument();

        await fireEvent.focus(input);
        await fireEvent.change(input, {
            target: {
                value: 'New Folder Name',
            },
        });
        await fireEvent.blur(input);

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('Submits form when enter key is pressed', async () => {
        const spy = jest.spyOn(Mutations, 'UPDATE_FOLDER_MUTATION');
        render(<UpdateFolderForm name="Folder Name" id="123" />);

        const input = screen.getByDisplayValue('Folder Name');

        expect(input).toBeInTheDocument();

        await fireEvent.focus(input);
        await fireEvent.change(input, {
            target: {
                value: 'New Folder Name',
            },
        });
        await fireEvent.keyDown(input, {
            keyCode: 13,
        });

        await waitFor(() => {
            expect(spy).toHaveBeenCalled();
        });
    });

    it('Does not call API if folder name is unchanged', async () => {
        const spy = jest.spyOn(Mutations, 'UPDATE_FOLDER_MUTATION');
        render(<UpdateFolderForm name="Folder Name" id="123" />);

        const input = screen.getByDisplayValue('Folder Name');

        expect(input).toBeInTheDocument();

        await fireEvent.focus(input);
        await fireEvent.keyDown(input, {
            keyCode: 13,
        });

        await waitFor(() => {
            expect(spy).not.toHaveBeenCalled();
        });
    });
});
