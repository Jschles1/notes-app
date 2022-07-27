import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Box, useMediaQuery, Theme } from '@mui/material';
import Card from '../ui/Card';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';

interface Props {
    onSubmit(data: any): void;
}

const CreateFolderForm: React.FC<Props> = ({ onSubmit }) => {
    const { register, handleSubmit, formState } = useForm();
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const hasNameError = !!formState?.errors?.name;

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: isMobile ? 'auto' : 'calc(100% - 300px)',
            }}
        >
            <Card
                sx={{
                    width: 350,
                    paddingTop: 4,
                    paddingBottom: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
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
                <TextInput
                    required
                    {...register('name', {
                        required: 'Please enter a folder name.',
                    })}
                    name="name"
                    placeholder="Folder Name"
                    error={hasNameError}
                />
                {hasNameError && <Box sx={{ marginY: 1, fontSize: 12, color: 'red' }}>Folder Name is required.</Box>}
                <Button
                    disableElevation
                    variant="contained"
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
        </Box>
    );
};

export default CreateFolderForm;
