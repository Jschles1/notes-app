import * as React from 'react';
import { Box } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderRounded';
import Link from '../ui/Link';
import { Folder } from '../../interfaces';

interface Props extends Omit<Folder, 'user'> {}

const FolderLinkMobile: React.FC<Props> = ({ _id, name }) => {
    return (
        <Link href={`/folders/${_id}/notes`} sx={{ display: 'block' }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'bg.main',
                    minHeight: '185px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
                >
                    <FolderIcon sx={{ display: 'block', marginBottom: 1 }} />
                    {name}
                </Box>
            </Box>
        </Link>
    );
};

export default FolderLinkMobile;
