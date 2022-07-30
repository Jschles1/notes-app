import * as React from 'react';
import { Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Cancel from '@mui/icons-material/Cancel';
import { useForm, Controller } from 'react-hook-form';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import TextInput from '../ui/TextInput';
import Button from '../ui/Button';
import EditorContainer from '../layout/EditorContainer';

interface Props {
    onSubmit(data): void;
    onCancel?(): void;
    name?: string;
    description?: string;
    isUpdating?: boolean;
}

const NoteEditor: React.FC<Props> = ({ name, description, onSubmit, isUpdating, onCancel }) => {
    const [editorHeight, setEditorHeight] = React.useState('');
    const rootRef = React.useRef() as any;
    const { control, handleSubmit, formState, setValue } = useForm({
        defaultValues: {
            name: name || '',
            description: description || '',
        },
    });
    const { isDesktop, isMobile } = useMediaQuery();

    React.useEffect(() => {
        const offset = !isDesktop ? 185 : 109;
        function changeEditorHeight(): void {
            setTimeout((): void => {
                setEditorHeight(`${rootRef?.current?.getBoundingClientRect().height - offset}px`);
            }, 0);
        }

        changeEditorHeight();

        window.addEventListener('resize', changeEditorHeight);

        return () => window.removeEventListener('resize', changeEditorHeight);
    }, [isDesktop]);

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
                    alignItems: isMobile ? 'center' : 'start',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={isMobile ? { flex: 1, paddingRight: 2 } : { width: '50%' }}>
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
                    sx={[
                        {
                            display: 'flex',
                            alignItems: 'center',
                        },
                        isMobile && {
                            flexDirection: 'column-reverse',
                        },
                    ]}
                >
                    {isUpdating ? (
                        <Button
                            color="bg.main"
                            onClick={onCancel}
                            startIcon={<Cancel />}
                            sx={
                                !isMobile && {
                                    paddingY: '16.5px',
                                    paddingX: 3,
                                    marginRight: 2,
                                }
                            }
                        >
                            Cancel
                        </Button>
                    ) : null}
                    <Button
                        color="bg.main"
                        onClick={handleSubmit(onSubmit)}
                        startIcon={<ArrowUpward />}
                        sx={
                            !isMobile
                                ? {
                                      paddingY: '16.5px',
                                      paddingX: 3,
                                  }
                                : {
                                      marginBottom: 1,
                                  }
                        }
                    >
                        Submit
                    </Button>
                </Box>
            </Box>

            <EditorContainer maxHeight={editorHeight || '100%'}>
                <CKEditor
                    editor={ClassicEditor}
                    data={description || '<p>Note Description *</p>'}
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
