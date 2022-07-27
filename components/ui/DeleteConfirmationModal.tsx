import * as React from 'react';
import { useSelector } from 'react-redux';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Button from '@components/ui/Button';
import { selectIsLoading } from '@store/loading/selectors';

interface Props {
    type: 'Folder' | 'Note';
    name: string;
    open: boolean;
    onClose(): void;
    onConfirm(): void;
}

const DeleteConfirmationModal: React.FC<Props> = ({ type, name, open, onClose, onConfirm }) => {
    const isLoading = useSelector(selectIsLoading);
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-confirm-title"
            aria-describedby="delete-confirm-description"
        >
            <DialogTitle id="delete-confirm-title">{`Delete ${type}?`}</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-confirm-description">
                    Are you sure you want to delete "{name}"?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="success" onClick={onConfirm} disabled={isLoading}>
                    Confirm
                </Button>
                <Button variant="outlined" color="error" onClick={onClose} autoFocus disabled={isLoading}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationModal;
