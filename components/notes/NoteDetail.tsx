import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { selectIsLoading } from '../../store/loading/selectors';
import { Note } from '../../interfaces';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { formatDate } from '../../lib/helpers';
import Breadcrumbs from '../layout/Breadcrumbs';
import LoadingIndicator from '../ui/LoadingIndicator';
import Skeleton from '../ui/Skeleton';
import Button from '../ui/Button';
import OptionButton from '../ui/OptionButton';
import { deleteNoteInit, updateNoteInit } from '../../store/notes/reducer';

const NoteEditor = dynamic(() => import('../form/NoteEditor'), {
    ssr: false,
    loading: () => <LoadingIndicator />,
});

const NoteDescription = dynamic(() => import('./NoteDescription'), {
    ssr: false,
    loading: () => <LoadingIndicator />,
});

interface Props {
    note: Note;
    folderId: string;
    noteId: string;
}

const NoteDetail: React.FC<Props> = ({ note, folderId, noteId }) => {
    const dispatch = useDispatch();
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const isLoading = useSelector(selectIsLoading);

    const onUpdate = (data) => {
        const payload = { ...data, folderId, noteId };
        dispatch(updateNoteInit(payload));
    };

    const onDelete = () => {
        dispatch(deleteNoteInit({ folderId, noteId }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setIsUpdating(false);
    }, [note]);

    console.log('NoteEditor', NoteEditor);

    return (
        <>
            <Box
                sx={{
                    paddingX: 2,
                    backgroundColor: 'secondary.light',
                    height: '100%',
                    maxHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {isUpdating ? (
                    <NoteEditor
                        name={note.name}
                        description={note.description}
                        onSubmit={onUpdate}
                        onCancel={() => setIsUpdating(false)}
                        isUpdating
                    />
                ) : (
                    <>
                        <Breadcrumbs />
                        <Box
                            sx={{
                                marginTop: 3,
                                display: 'flex',
                                alignItems: 'start',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Box>
                                <Typography
                                    variant="h5"
                                    sx={{
                                        marginBottom: 1,
                                        marginTop: 0,
                                        lineHeight: 1,
                                        fontWeight: 'bold',
                                    }}
                                >
                                    <Skeleton width="250px">{note?.name}</Skeleton>
                                </Typography>
                                <Typography paragraph sx={{ marginBottom: 0 }}>
                                    <Skeleton width="250px">
                                        <Typography component="span" sx={{ color: 'primary.light' }}>
                                            Last updated:
                                        </Typography>{' '}
                                        {formatDate(note?.updatedAt)}
                                    </Skeleton>
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                marginTop: 1,
                            }}
                        >
                            <Button
                                color="bg.main"
                                sx={{ marginRight: 2, fontSize: '12px' }}
                                onClick={() => setIsUpdating(true)}
                                startIcon={<Edit />}
                                disabled={isLoading}
                            >
                                Update
                            </Button>
                            <OptionButton
                                variant="warning"
                                onClick={() => setOpen(true)}
                                sx={{ fontSize: '12px' }}
                                startIcon={<Delete />}
                                disabled={isLoading}
                            >
                                Delete
                            </OptionButton>
                        </Box>

                        <NoteDescription value={note?.description} />
                    </>
                )}
            </Box>

            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="delete-confirm-title"
                aria-describedby="delete-confirm-description"
            >
                <DialogTitle id="delete-confirm-title">{'Delete Note?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="delete-confirm-description">
                        Are you sure you want to delete "{note?.name}"?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="success" onClick={onDelete} disabled={isLoading}>
                        Confirm
                    </Button>
                    <Button variant="outlined" color="error" onClick={handleClose} autoFocus disabled={isLoading}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default NoteDetail;
