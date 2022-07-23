import * as React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Box, useMediaQuery, Theme, Grid } from '@mui/material';
import Link from '../ui/Link';
import FolderLink from './FolderLink';
import FolderLinkMobile from './FolderLinkMobile';
import { selectFolders } from '../../store/folders/selectors';
import { Folder } from '../../interfaces';

const DesktopFoldersList: React.FC<{ folders: Folder[]; isNav?: boolean }> = ({ folders, isNav = false }) => (
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
);

const MobileFoldersList: React.FC<{ folders: Folder[] }> = ({ folders }) => (
    <Grid spacing={2} container sx={{ paddingBottom: 2 }}>
        {folders.map((folder) => (
            <Grid item xs={6}>
                <FolderLinkMobile key={folder._id} _id={folder._id} name={folder.name} />
            </Grid>
        ))}
    </Grid>
);

interface Props {
    isNav?: boolean;
}

const FoldersList: React.FC<Props> = ({ isNav = false }) => {
    const folders = useSelector(selectFolders);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

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
                    fontSize: isNav || isMobile ? 24 : 32,
                    marginTop: isMobile ? 2 : 0,
                    marginBottom: 2,
                    textDecoration: 'none',
                }}
            >
                Your Folders:
            </Link>
            {isMobile ? <MobileFoldersList folders={folders} /> : <DesktopFoldersList folders={folders} />}
        </Box>
    );
};

export default FoldersList;
