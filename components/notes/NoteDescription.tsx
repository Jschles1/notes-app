import * as React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '../../ckeditor5/build/ckeditor';
import EditorContainer from '../ui/EditorContainer';

interface Props {
    value: string;
    height: string;
}

const NoteDescription: React.FC<Props> = ({ height, value }) => {
    return (
        <EditorContainer maxHeight={height || '100%'}>
            <CKEditor editor={ClassicEditor} data={value} disabled />
        </EditorContainer>
    );
};

export default NoteDescription;
