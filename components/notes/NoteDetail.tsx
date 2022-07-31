import * as React from 'react';
import { useDispatch } from 'react-redux';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
import { Note } from '../../interfaces';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import { formatDate } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import Breadcrumbs from '@components/layout/Breadcrumbs';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import Skeleton from '@components/ui/Skeleton';
import Button from '@components/ui/Button';
import OptionButton from '@components/ui/OptionButton';
import DeleteConfirmationModal from '@components/ui/DeleteConfirmationModal';
import { deleteNoteInit } from '@store/notes/reducer';
import { useFolders } from '@lib/graphql/hooks';
import fetcher from '@lib/graphql/fetcher';
import { UPDATE_NOTE_MUTATION, DELETE_NOTE_MUTATION } from '@lib/graphql/mutations';
import useEmail from '@lib/hooks/useEmail';
import { setAlert } from '@store/alert/reducer';
import { useRouter } from 'next/router';

const NoteEditor = dynamic(() => import('@components/form/NoteEditor'), {
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
    const router = useRouter();
    const { email } = useEmail();
    const [isUpdating, setIsUpdating] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { isLoading, revalidate } = useFolders();
    const { isDesktop } = useMediaQuery();

    const onUpdate = async (data) => {
        const { name, description } = data;
        const mutation = UPDATE_NOTE_MUTATION(noteId, folderId, name, description, email);
        const response = await fetcher(mutation);
        if (response?.updateNote?.success) {
            dispatch(
                setAlert({
                    type: 'success',
                    message: 'Note Successfully Updated!',
                })
            );
            setIsUpdating(false);
            // TODO: Handle loading state
            revalidate();
        } else {
            // TODO: handle error
        }
    };

    const onDelete = async () => {
        // dispatch(deleteNoteInit({ folderId, noteId }));
        const mutation = DELETE_NOTE_MUTATION(noteId, folderId, email);
        const response = await fetcher(mutation);
        if (response?.deleteNote?.success) {
            dispatch(
                setAlert({
                    type: 'success',
                    message: 'Note Successfully Deleted!',
                })
            );

            revalidate();

            router.push(`/folders/${folderId}/notes`);
        } else {
            // TODO: handle error
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setIsUpdating(false);
    }, [note]);

    return (
        <>
            <Box
                sx={{
                    paddingX: 2,
                    backgroundColor: 'secondary.light',
                    height: !isDesktop ? '100vh' : '100%',
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
                        {isDesktop && <Breadcrumbs />}
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

            <DeleteConfirmationModal
                open={open}
                type="Note"
                onClose={handleClose}
                name={note?.name}
                onConfirm={onDelete}
            />
        </>
    );
};

export default NoteDetail;
