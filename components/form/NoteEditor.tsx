import * as React from 'react';
import { Box, styled, BoxProps } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import TextField from '@mui/material/TextField';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Cancel from '@mui/icons-material/Cancel';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import EditorContainer from '../ui/EditorContainer';

interface Props {
    onSubmit(data): void;
    onCancel?(): void;
    name?: string;
    description?: string;
    isUpdating?: boolean;
}

const NoteEditor: React.FC<Props> = ({
    name,
    description,
    onSubmit,
    isUpdating,
    onCancel,
}) => {
    const [editorHeight, setEditorHeight] = React.useState('');
    const rootRef = React.useRef() as any;
    const { control, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            name: name || '',
            description: description || '',
        },
    });

    React.useEffect(() => {
        function changeEditorHeight(): void {
            setTimeout((): void => {
                setEditorHeight(
                    `${
                        rootRef?.current?.getBoundingClientRect().height - 109
                    }px`
                );
            }, 0);
        }

        changeEditorHeight();

        window.addEventListener('resize', changeEditorHeight);

        return () => window.removeEventListener('resize', changeEditorHeight);
    }, []);

    return (
        <Box
            sx={{
                paddingY: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
            }}
            ref={rootRef}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'start',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: '50%' }}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => (
                            <TextInput
                                variant="gray"
                                fullWidth
                                required
                                name={name}
                                value={value}
                                onChange={onChange}
                                inputRef={ref}
                                placeholder="Note Title"
                                error={!!formState?.errors?.name}
                            />
                        )}
                        rules={{ required: 'Note Title is required.' }}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {isUpdating ? (
                        <Button
                            color="bg.main"
                            onClick={onCancel}
                            startIcon={<Cancel />}
                            sx={{
                                paddingY: '16.5px',
                                paddingX: 3,
                                marginRight: 2,
                            }}
                        >
                            Cancel
                        </Button>
                    ) : null}
                    <Button
                        color="bg.main"
                        onClick={handleSubmit(onSubmit)}
                        startIcon={<ArrowUpward />}
                        sx={{
                            paddingY: '16.5px',
                            paddingX: 3,
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>

            <EditorContainer maxHeight={editorHeight || '100%'}>
                <CKEditor
                    editor={ClassicEditor}
                    data={description || '<p>Note Description *</p>'}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(_, editor) => {
                        const data = editor.getData();
                        setValue('description', data);
                    }}
                    config={{
                        simpleUpload: {
                            uploadUrl: '/api/upload',
                        },
                    }}
                />
            </EditorContainer>
        </Box>
    );
};

export default NoteEditor;