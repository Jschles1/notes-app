import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../../../components/ui/Card';
import FolderNameHeader from '../../../../components/folders/FolderNameHeader';
import NotesList from '../../../../components/notes/NotesList';
import { serverSideAuthentication } from '../../../../lib/auth';
import { fetchNotesInit } from '../../../../store/notes/reducer';
import { selectSelectedFolder } from '../../../../store/folders/selectors';
import { deleteFolderInit, updateFolderInit } from '../../../../store/folders/reducer';
import { selectUser } from '../../../../store/auth/selectors';
import { selectRedirect } from '../../../../store/history/selectors';
import { clearRedirect } from '../../../../store/history/reducer';
import { selectIsLoading } from '../../../../store/loading/selectors';
import { selectNotes } from '../../../../store/notes/selectors';
import LoadingIndicator from '../../../../components/ui/LoadingIndicator';

export const getServerSideProps = serverSideAuthentication();

const NotesPage: NextPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const isLoading = useSelector(selectIsLoading);
    const selectedFolder = useSelector(selectSelectedFolder);
    const notes = useSelector(selectNotes);
    const successRedirect = useSelector(selectRedirect);
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const folderId = router.query.folderId as string;

    const onEditSubmit = (data) => {
        const updatedFolder = { name: data.name, _id: folderId, user: user.id };
        dispatch(updateFolderInit(updatedFolder));
    };

    const onDeleteClick = () => {
        setOpen(true);
    };

    const onDeleteFolderConfirm = () => {
        dispatch(deleteFolderInit(folderId));
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    }, []);

    useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Card>
                <FolderNameHeader name={selectedFolder} onEdit={onEditSubmit} onDelete={onDeleteClick} />
            </Card>

            {isLoading ? <LoadingIndicator /> : <NotesList notes={notes} />}

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="delete-confirm-title"
                aria-describedby="delete-confirm-description"
            >
                <DialogTitle id="delete-confirm-title">{'Delete Folder?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-confirm-description">
                        Are you sure you want to delete "{selectedFolder}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="success" onClick={onDeleteFolderConfirm} disabled={isLoading}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClose} autoFocus disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default NotesPage;
