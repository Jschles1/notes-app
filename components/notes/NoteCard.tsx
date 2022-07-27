import * as React from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { renderDescriptionFirstLine, decodeHtml, formatDate } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import Link from '@components/ui/Link';

interface Props {
    folderId: string;
    noteId: string;
    name: string;
    description: string;
    updatedAt: string;
    selectedNote?: string;
}

const NoteCard: React.FC<Props> = ({ folderId, noteId, name, description, updatedAt, selectedNote }) => {
    const { isMobile } = useMediaQuery();
    const isSelected = noteId === selectedNote;
    return (
        <Link href={`/folders/${folderId}/notes/${noteId}`} sx={{ textDecoration: 'none' }}>
            <Paper
                elevation={0}
                sx={{
                    backgroundColor: 'bg.main',
                    padding: 2,
                    borderRadius: 2,
                    transition: 'opacity 250ms',
                    opacity: isSelected || isMobile ? 1 : 0.5,
                    '&:hover': {
                        opacity: 1,
                        cursor: 'pointer',
                    },
                }}
            >
                <Box sx={{ fontSize: 14, color: 'primary.light' }}>{formatDate(updatedAt)}</Box>
                <Box
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        marginY: 1,
                        color: 'primary.light',
                    }}
                >
                    {name}
                </Box>
                <Box
                    sx={{
                        maxWidth: '100%',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        color: 'primary.light',
                        fontSize: 14,
                    }}
                >
                    {decodeHtml(renderDescriptionFirstLine(description))}
                </Box>
            </Paper>
        </Link>
    );
};

export default React.memo(NoteCard);
