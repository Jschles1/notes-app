import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    styled,
    TextField,
    TextFieldProps,
    Typography,
} from '@mui/material';
import Card from '../ui/Card';
import { selectIsLoading } from '../../store/loading/selectors';
import { Note } from '../../interfaces';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { formatDate } from '../../lib/helpers';
import NoteForm from '../form/NoteForm';
import Skeleton from '../ui/Skeleton';
import { deleteNoteInit, updateNoteInit } from '../../store/notes/reducer';

const NoteDescription = styled((props: TextFieldProps) => <TextField {...props} multiline fullWidth disabled />)(
    ({ theme }) => ({
        height: '100%',
        '& .MuiOutlinedInput-root': {
            height: '100%',
            display: 'block',
        },
        '& .Mui-disabled': {
            color: theme.palette.primary.main,
            WebkitTextFillColor: `${theme.palette.primary.main} !important`,
        },
    })
);

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

    return isUpdating ? (
        <NoteForm
            name={note.name}
            description={note.description}
            onSubmit={onUpdate}
            onCancel={() => setIsUpdating(false)}
            isUpdating
        />
    ) : (
        <>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            sx={{
                                marginBottom: 1,
                                marginTop: 0,
                                lineHeight: 1,
                            }}
                        >
                            <Skeleton>{note?.name}</Skeleton>
                        </Typography>
                        <Typography paragraph>
                            <Skeleton>Last updated: {formatDate(note?.updatedAt)}</Skeleton>
                        </Typography>
                    </Box>

                    <Box>
                        <Button
                            variant="outlined"
                            sx={{ marginRight: 2, textTransform: 'unset' }}
                            onClick={() => setIsUpdating(true)}
                            startIcon={<Edit />}
                            disabled={isLoading}
                        >
                            Update Note
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ textTransform: 'unset' }}
                            color="error"
                            onClick={() => setOpen(true)}
                            startIcon={<Delete />}
                            disabled={isLoading}
                        >
                            Delete Note
                        </Button>
                    </Box>
                </Box>

                <NoteDescription value={note?.description} />
            </Card>

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
