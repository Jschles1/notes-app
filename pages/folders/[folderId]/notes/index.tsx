import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box } from '@mui/material';
import Card from '../../../../components/ui/Card';
import FolderNameHeader from '../../../../components/folders/FolderNameHeader';
import NotesList from '../../../../components/notes/NotesList';
import NotesSelection from '../../../../components/notes/NoteSelection';
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
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    const folderId = router.query.folderId as string;

    console.log({ notes });

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

    React.useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    }, [folderId]);

    React.useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

    return null;
};

export default NotesPage;
