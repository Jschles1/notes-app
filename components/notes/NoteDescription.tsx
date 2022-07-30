import * as React from 'react';
import { Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import EditorContainer from '../layout/EditorContainer';
import useMediaQuery from '@lib/hooks/useMediaQuery';

interface Props {
    value: string;
}

const NoteDescription: React.FC<Props> = ({ value }) => {
    const [editorHeight, setEditorHeight] = React.useState('');
    const rootRef = React.useRef() as any;
    const { isMobile } = useMediaQuery();

    // TODO: Make hook
    React.useEffect(() => {
        const offset = isMobile ? 88 : 32;
        function changeEditorHeight(): void {
            setTimeout((): void => {
                setEditorHeight(`${rootRef?.current?.getBoundingClientRect().height - offset}px`);
            }, 0);
        }

        changeEditorHeight();

        window.addEventListener('resize', changeEditorHeight);

        return () => window.removeEventListener('resize', changeEditorHeight);
    }, [isMobile]);

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
