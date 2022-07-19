import * as React from 'react';
import { Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import EditorContainer from '../ui/EditorContainer';

interface Props {
    value: string;
}

const NoteDescription: React.FC<Props> = ({ value }) => {
    const [editorHeight, setEditorHeight] = React.useState('');
    const rootRef = React.useRef() as any;

    // TODO: Make hook
    React.useEffect(() => {
        function changeEditorHeight(): void {
            setTimeout((): void => {
                setEditorHeight(
                    `${rootRef?.current?.getBoundingClientRect().height - 32}px`
                );
            }, 0);
        }

        changeEditorHeight();

        window.addEventListener('resize', changeEditorHeight);

        return () => window.removeEventListener('resize', changeEditorHeight);
    }, []);

    return (
        <Box
            ref={rootRef}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
            }}
        >
            <EditorContainer maxHeight={editorHeight || '100%'}>
                <CKEditor editor={ClassicEditor} data={value} disabled />
            </EditorContainer>
        </Box>
    );
};

export default NoteDescription;