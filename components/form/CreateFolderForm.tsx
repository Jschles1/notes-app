import * as React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Box, Button } from '@mui/material';
import Card from '../ui/Card';

interface Props {
    onSubmit(data: any): void;
}

const CreateFolderForm: React.FC<Props> = ({ onSubmit }) => {
    const { register, handleSubmit, formState } = useForm();

    return (
        <Card
            sx={{
                width: 350,
                paddingTop: 4,
                paddingBottom: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'space-between',
            }}
        >
            <Box
                sx={{
                    textAlign: 'center',
                    color: 'primary.main',
                    marginBottom: 2,
                }}
            >
                Create a New Folder:
            </Box>
            <TextField
                required
                {...register('name', {
                    required: 'Please enter a folder name.',
                })}
                name="name"
                variant="filled"
                label="Folder Name"
                error={!!formState?.errors?.name}
                helperText={formState?.errors?.name?.message}
            />
            <Button
                disableElevation
                variant="contained"
                color="secondary"
                onClick={handleSubmit(onSubmit)}
                sx={{
                    display: 'block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 3,
                    textTransform: 'unset',
                }}
            >
                Submit
            </Button>
        </Card>
    );
};

export default CreateFolderForm;
