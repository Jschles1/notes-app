import * as React from 'react';
import { Box } from '@mui/material';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import EditorContainer from '../layout/EditorContainer';
import useMediaQuery from '@lib/hooks/useMediaQuery';

interface Props {
    value: string;
}

const NoteDescription: React.FC<Props> = ({ value = '' }) => {
    const [editorHeight, setEditorHeight] = React.useState('');
    const rootRef = React.useRef() as any;
    const { isDesktop } = useMediaQuery();

    React.useEffect(() => {
        const offset = !isDesktop ? 88 : 32;
        function changeEditorHeight(): void {
            setTimeout((): void => {
                if (rootRef && rootRef.current) {
                    setEditorHeight(`${rootRef?.current?.getBoundingClientRect().height - offset}px`);
                }
            }, 0);
        }

        changeEditorHeight();

        window.addEventListener('resize', changeEditorHeight);

        return () => window.removeEventListener('resize', changeEditorHeight);
    }, [isDesktop, rootRef]);

    return (
        <Box
            ref={rootRef}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                maxWidth: {
                    lg: '100%',
                    md: '45vw',
                    sm: 'auto',
                },
            }}
        >
            <EditorContainer maxHeight={editorHeight || '100%'}>
                <CKEditor editor={ClassicEditor} data={value} disabled />
            </EditorContainer>
        </Box>
    );
};

export default NoteDescription;
