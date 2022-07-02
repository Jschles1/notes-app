import * as React from 'react';
import { Box, styled, BoxProps } from '@mui/material';
// import SimpleUploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
// import TextField, { TextFieldProps } from '@mui/material/TextField';
// import ArrowUpward from '@mui/icons-material/ArrowUpward';
// import Cancel from '@mui/icons-material/Cancel';
// import { useForm, Controller } from 'react-hook-form';
import Card from '../ui/Card';
import LoadingIndicator from '../ui/LoadingIndicator';
// import BasicButton from '../ui/BasicButton';

const EditorContainerWrapper = React.forwardRef<HTMLDivElement, BoxProps>(function EditorContainerWrapper(
    { children, ...other },
    ref
) {
    return (
        <Box ref={ref} {...other}>
            {children}
        </Box>
    );
});

const EditorContainer = styled(EditorContainerWrapper, {
    shouldForwardProp: (prop) => prop !== 'maxHeight',
})<{ maxHeight: string }>(({ theme, maxHeight }) => ({
    height: '100%',
    width: '100%',
    maxHeight,
    '& .ck-editor__editable_inline': {
        color: theme.palette.primary.main,
        height: `calc(${maxHeight} - 40px)`,
        maxHeight: `calc(${maxHeight} - 40px)`,
    },
    '& .ck.ck-editor': {
        height: maxHeight,
        width: '100%',
        maxHeight,
        display: 'flex',
        flexDirection: 'column',
    },
    '& .ck.ck-editor__main': {
        height: maxHeight,
        width: '100%',
        maxHeight,
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
    const [editorHeight, setEditorHeight] = React.useState('');
    const editorRef = React.useRef() as any;
    const containerRef = React.createRef() as any;
    // const { CKEditor, ClassicEditor, SimpleUploadAdapter } =
    //     (editorRef.current || {}) as any;

    React.useEffect(() => {
        // editorRef.current = {
        //     ClassicEditor: require('../../ckeditor5/build/ckeditor'),
        //     CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
        //     // SimpleUploadAdapter: require('@ckeditor/ckeditor5-upload/src/adapters/simpleuploadadapter'),
        // };
        setIsLoaded(true);
    }, []);

    React.useEffect(() => {
        if (isLoaded) {
            setTimeout(() => {
                setEditorHeight(`${containerRef.current.getBoundingClientRect().height}px`);
            }, 0);
        }
    }, [isLoaded]);

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'start',
            }}
        >
            {isLoaded ? (
                <EditorContainer ref={containerRef} maxHeight={editorHeight || '100%'}>
                    <CKEditor
                        editor={ClassicEditor}
                        data="<p>Hello from CKEditor 5!</p>"
                        onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                            console.log('Editor is ready to use!', editor);
                        }}
                        config={{
                            simpleUpload: {
                                uploadUrl: '/api/upload',
                            },
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
