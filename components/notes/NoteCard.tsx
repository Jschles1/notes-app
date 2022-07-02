import * as React from 'react';
import DoubleArrowRounded from '@mui/icons-material/DoubleArrowRounded';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { renderDescriptionFirstLine, decodeHtml } from '../../lib/helpers';
import Link from '../ui/Link';

interface Props {
    folderId: string;
    noteId: string;
    name: string;
    description: string;
}

const NoteCard: React.FC<Props> = ({ folderId, noteId, name, description }) => (
    <Link href={`/folders/${folderId}/notes/${noteId}`} sx={{ textDecoration: 'none' }}>
        <Paper
            sx={{
                backgroundColor: '#fff',
                paddingX: 2,
                paddingY: 3,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'background-color 250ms',
                '&:hover': {
                    color: '#fff !important',
                    bgcolor: 'primary.main',
                    cursor: 'pointer',
                },
            }}
        >
            <Box sx={{ width: '90%' }}>
                <Box
                    sx={{
                        fontWeight: 'bold',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
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
                    }}
                >
                    {decodeHtml(renderDescriptionFirstLine(description))}
                </Box>
            </Box>

            <Box>
                <DoubleArrowRounded />
            </Box>
        </Paper>
    </Link>
);

export default React.memo(NoteCard);
