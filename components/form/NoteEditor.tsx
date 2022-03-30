import * as React from 'react';
import { Box, styled } from '@mui/material';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import TextField, { TextFieldProps } from '@mui/material/TextField';
// import ArrowUpward from '@mui/icons-material/ArrowUpward';
// import Cancel from '@mui/icons-material/Cancel';
// import { useForm, Controller } from 'react-hook-form';
import Card from '../ui/Card';
import LoadingIndicator from '../ui/LoadingIndicator';
// import BasicButton from '../ui/BasicButton';

const EditorContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    width: '100%',
    maxHeight: '100%',
    '& .ck-editor__editable_inline': {
        color: theme.palette.primary.main,
        height: '100%',
        maxHeight: '100%',
    },
    '& .ck.ck-editor': {
        height: '100%',
        width: '100%',
        maxHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    '& .ck.ck-editor__main': {
        height: '100%',
        width: '100%',
        maxHeight: '100%',
    },
}));

interface Props {
    // onSubmit(data): void;
    // onCancel?(): void;
    // name?: string;
    // description?: string;
    // isUpdating?: boolean;
    // isLoaded: boolean;
}

const NoteEditor: React.FC<Props> = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const editorRef = React.useRef() as any;
    const { CKEditor, ClassicEditor } = (editorRef.current || {}) as any;

    React.useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        };
        setIsLoaded(true);
    }, []);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {isLoaded ? (
                <EditorContainer>
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);

                            editor.editing.view.change((writer) => {
                                console.log('chage');
                                // writer.setStyle(
                                //     'height',
                                //     '1%',
                                //     editor.editing.view.document.getRoot()
                                // );
                            });
                        }}
                    />
                </EditorContainer>
            ) : (
                <LoadingIndicator />
            )}
        </Card>
    );
};

export default NoteEditor;
