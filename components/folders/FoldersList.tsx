import * as React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Box, useMediaQuery } from '@mui/material';
import Link from '../ui/Link';
import FolderLink from './FolderLink';
import { selectFolders } from '../../store/folders/selectors';

interface Props {
    isNav?: boolean;
}

const FoldersList: React.FC<Props> = ({ isNav = false }) => {
    const folders = useSelector(selectFolders);
    // const sm = useMediaQuery((theme) => theme.breakpoints.up('sm'));
    console.log('fodlers', folders);
    return (
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                marginTop: isNav ? 0 : 'auto',
                maxHeight: isNav ? '74%' : 'auto',
            }}
        >
            <Link
                href="/folders"
                sx={{
                    fontWeight: 'bold',
                    fontSize: isNav ? 24 : 32,
                    marginBottom: 2,
                    textDecoration: 'none',
                }}
            >
                Your Folders:
            </Link>
            <Stack
                sx={{
                    overflowY: 'auto',
                    flex: 1,
                }}
                spacing={2}
            >
                {folders.map((folder) => (
                    <FolderLink key={folder._id} _id={folder._id} name={folder.name} isNav={isNav} />
                ))}
            </Stack>
        </Box>
    );
};

export default FoldersList;
