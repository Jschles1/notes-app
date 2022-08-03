import { render, screen, fireEvent } from '@/jest.setup';
import FolderLink from '@components/folders/FolderLink';
import { waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import 'next-router-mock/dynamic-routes';
import * as Mutations from '@lib/graphql/mutations';

describe('<FolderLink />', () => {
    beforeAll(() => {
        (mockRouter as any).registerPaths(['/folders/[folderId]/notes/']);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('Renders without error', () => {
        render(<FolderLink _id="123" name="Folder Name" />);

        expect(document.querySelector('a[href="/folders/123/notes"]')).toBeInTheDocument();
        expect(screen.getByText('Folder Name')).toBeInTheDocument();
    });

    it('Opens <UpdateFolderForm /> upon clicking "Update" button', async () => {
        render(<FolderLink _id="123" name="Folder Name" />);

        const optionsButton = screen.getByTestId(`folder-options-123`);

        expect(optionsButton).toBeInTheDocument();
        expect(document.querySelector('.MuiCollapse-hidden')).toBeInTheDocument();

        await fireEvent.click(optionsButton);

        await waitFor(() => {
            expect(document.querySelector('.MuiCollapse-hidden')).not.toBeInTheDocument();

            expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        });

        const updateButton = screen.getByText('Update');

        await fireEvent.click(updateButton);

        await waitFor(async () => {
            expect(screen.getByRole('textbox')).toBeInTheDocument();
        });
    });

    it('Opens <DeleteConfirmationModal /> upon clicking "Delete" button', async () => {
        render(<FolderLink _id="234" name="Folder Name" />);

        const optionsButton = screen.getByTestId(`folder-options-234`);

        expect(optionsButton).toBeInTheDocument();
        expect(document.querySelector('.MuiCollapse-hidden')).toBeInTheDocument();

        await fireEvent.click(optionsButton);

        await waitFor(() => {
            expect(document.querySelector('.MuiCollapse-hidden')).not.toBeInTheDocument();

            expect(screen.queryByText('Delete Folder?')).not.toBeInTheDocument();
        });

        const deleteButton = screen.getByText('Delete');

        await fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Folder?')).toBeInTheDocument();
        });
    });

    it('Closes delete folder modal and hides folder options when clicking "Cancel"', async () => {
        render(<FolderLink _id="456" name="Folder Name" />);

        const optionsButton = screen.getByTestId(`folder-options-456`);

        expect(optionsButton).toBeInTheDocument();
        expect(document.querySelector('.MuiCollapse-hidden')).toBeInTheDocument();

        await fireEvent.click(optionsButton);

        await waitFor(() => {
            expect(document.querySelector('.MuiCollapse-hidden')).not.toBeInTheDocument();

            expect(screen.queryByText('Delete Folder?')).not.toBeInTheDocument();
        });

        const deleteButton = screen.getByText('Delete');

        await fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Folder?')).toBeInTheDocument();
        });

        const cancelButton = screen.getByText('Cancel');

        await fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Folder?')).not.toBeInTheDocument();
            expect(document.querySelector('.MuiCollapse-hidden')).toBeInTheDocument();
        });
    });

    it('Closes delete folder modal and calls API when clicking "Confirm"', async () => {
        mockRouter.setCurrentUrl('/folders/678/notes');
        const spy = jest.spyOn(Mutations, 'DELETE_FOLDER_MUTATION');
        render(<FolderLink _id="678" name="Folder Name 2" />);

        const optionsButton = screen.getByTestId(`folder-options-678`);

        expect(optionsButton).toBeInTheDocument();
        expect(document.querySelector('.MuiCollapse-hidden')).toBeInTheDocument();

        await fireEvent.click(optionsButton);

        await waitFor(() => {
            expect(document.querySelector('.MuiCollapse-hidden')).not.toBeInTheDocument();

            expect(screen.queryByText('Delete Folder?')).not.toBeInTheDocument();
        });

        const deleteButton = screen.getByText('Delete');

        await fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Folder?')).toBeInTheDocument();
        });

        const confirmButton = screen.getByText('Confirm');

        await fireEvent.click(confirmButton);

        await waitFor(() => {
            expect(screen.queryByText('Delete Folder?')).not.toBeInTheDocument();
            expect(spy).toHaveBeenCalled();
        });
    });
});
