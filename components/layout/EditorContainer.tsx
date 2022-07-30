import * as React from 'react';
import { Box, BoxProps, styled } from '@mui/material';

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
    marginTop: theme.spacing(2),
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

export default EditorContainer;
