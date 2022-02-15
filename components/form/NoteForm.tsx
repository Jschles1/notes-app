import { FC, useEffect } from 'react';
import { Box, styled } from '@mui/material';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import Card from '../ui/Card';

import BasicButton from '../ui/BasicButton';

const NoteDescriptionTextArea = styled((props: TextFieldProps) => <TextField {...props} multiline fullWidth />)({
    height: '100%',
    '& .MuiOutlinedInput-root': {
        height: '100%',
        display: 'block',
    },
});

interface Props {
    onSubmit(data): void;
    name?: string;
    description?: string;
}

const NoteForm: FC<Props> = ({ onSubmit, name, description }) => {
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            name: name || '',
            description: description || '',
        },
    });

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field: { onChange, value, name, ref } }) => (
                        <TextField
                            required
                            name={name}
                            value={value}
                            onChange={onChange}
                            inputRef={ref}
                            label="Note Title"
                            error={!!formState?.errors?.name}
                            helperText={formState?.errors?.name?.message}
                        />
                    )}
                    rules={{ required: 'Note Title is required.' }}
                />

                <BasicButton onClick={handleSubmit(onSubmit)}>Submit</BasicButton>
            </Box>

            <Box sx={{ marginTop: 2, height: '100%' }}>
                <Controller
                    name="description"
                    control={control}
                    render={({ field: { onChange, value, name, ref } }) => (
                        <NoteDescriptionTextArea
                            required
                            name={name}
                            value={value}
                            inputRef={ref}
                            onChange={onChange}
                            label="Note Description"
                            error={!!formState?.errors?.description}
                            helperText={formState?.errors?.description?.message}
                        />
                    )}
                    rules={{ required: 'Note Description is required.' }}
                />
            </Box>
        </Card>
    );
};

export default NoteForm;
