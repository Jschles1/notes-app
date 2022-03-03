import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, styled, TextField, TextFieldProps, Typography } from '@mui/material';
import Card from '../ui/Card';
import { selectIsLoading } from '../../store/loading/selectors';
import { Note } from '../../interfaces';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { formatDate } from '../../lib/helpers';
import NoteForm from '../form/NoteForm';
import Skeleton from '../ui/Skeleton';
import { updateNoteInit } from '../../store/notes/reducer';

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
    const isLoading = useSelector(selectIsLoading);

    const onUpdate = (data) => {
        const payload = { ...data, folderId, noteId };
        dispatch(updateNoteInit(payload));
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
                        onClick={() => {}}
                        startIcon={<Delete />}
                        disabled={isLoading}
                    >
                        Delete Note
                    </Button>
                </Box>
            </Box>

            <NoteDescription value={note?.description} />
        </Card>
    );
};

export default NoteDetail;
