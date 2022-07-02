import * as React from 'react';
import NextLink from 'next/link';
import { Box, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderRounded';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { Folder } from '../../interfaces';

interface Props extends Omit<Folder, 'user'> {
    isNav?: boolean;
}

const FolderButton: React.FC<Props> = ({ _id, name, isNav = false }) => {
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderRadius: '4px',
                    '&:hover': {
                        backgroundColor: isNav ? 'secondary.light' : 'bg.main',
                    },
                    paddingX: 1,
                    cursor: 'pointer',
                }}
            >
                <NextLink href={`/folders/${_id}/notes`}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <FolderIcon sx={{ marginRight: 1 }} />
                        {name}
                    </Box>
                </NextLink>
                <IconButton color="primary" disableRipple>
                    <MoreIcon />
                </IconButton>
            </Box>
            {/* TODO: Options (Update and Delete) */}
        </Box>
    );
};

export default FolderButton;
