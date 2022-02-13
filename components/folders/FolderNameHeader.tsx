import { FC } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Typography, Button, TextField, Skeleton } from '@mui/material';
import Edit from '@mui/icons-material/Edit';
import Delete from '@mui/icons-material/Delete';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Cancel from '@mui/icons-material/Cancel';
import FolderRounded from '@mui/icons-material/FolderRounded';
import { selectIsLoading } from '../../store/loading/selectors';

type Props = {
    name: string;
    onEdit(data): void;
    onDelete(): void;
};

const FolderNameHeader: FC<Props> = ({ name, onEdit, onDelete }) => {
    const isLoading = useSelector(selectIsLoading);
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: useMemo(
            () => ({
                name,
            }),
            [name]
        ),
    });

    const resetForm = () => {
        reset();
        setIsEditing(false);
    };

    const onSubmit = (data) => {
        onEdit(data);
        setIsEditing(false);
    };

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            resetForm();
        }
    }, [formState, reset]);

    useEffect(() => {
        reset({ name });
    }, [name]);

    const renderFolderNameWithOptions = () => (
        <>
            <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                    minWidth: '40%',
                }}
            >
                {isLoading ? (
                    <Skeleton animation="wave" width="100%" />
                ) : (
                    <>
                        <FolderRounded sx={{ marginRight: 1, fontSize: '32px' }} /> {name}
                    </>
                )}
            </Typography>

            <Box
                sx={{
                    marginRight: 2,
                }}
            >
                <Button
                    variant="outlined"
                    sx={{ marginRight: 2, textTransform: 'unset' }}
                    onClick={() => setIsEditing(true)}
                    startIcon={<Edit />}
                    disabled={isLoading}
                >
                    Edit Folder Name
                </Button>
                <Button
                    variant="outlined"
                    sx={{ textTransform: 'unset' }}
                    color="error"
                    onClick={onDelete}
                    startIcon={<Delete />}
                    disabled={isLoading}
                >
                    Delete Folder
                </Button>
            </Box>
        </>
    );

    const renderEditingFolderForm = () => (
        <>
            <Box
                sx={{
                    width: '40%',
                }}
            >
                <TextField
                    required
                    {...register('name', {
                        required: 'Please enter a folder name.',
                    })}
                    name="name"
                    variant="filled"
                    label="New Folder Name"
                    error={!!formState?.errors?.name}
                    helperText={formState?.errors?.name?.message}
                    fullWidth
                />
            </Box>

            <Box
                sx={{
                    marginRight: 2,
                }}
            >
                <Button
                    variant="outlined"
                    sx={{ marginRight: 2 }}
                    onClick={handleSubmit(onSubmit)}
                    startIcon={<ArrowUpward />}
                >
                    Submit
                </Button>
                <Button variant="outlined" color="error" onClick={resetForm} startIcon={<Cancel />}>
                    Cancel
                </Button>
            </Box>
        </>
    );

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {isEditing ? renderEditingFolderForm() : renderFolderNameWithOptions()}
        </Box>
    );
};

export default FolderNameHeader;
