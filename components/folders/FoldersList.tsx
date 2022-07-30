import * as React from 'react';
import { Stack, Box, Grid } from '@mui/material';
import Link from '../ui/Link';
import FolderLink from './FolderLink';
import FolderLinkMobile from './FolderLinkMobile';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { Folder } from '../../interfaces';
import { useFolders } from '@lib/graphql/hooks';

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

const MobileFoldersList: React.FC<{ folders: Folder[]; isTablet: boolean }> = ({ folders, isTablet }) => (
    <Grid spacing={2} container sx={{ paddingBottom: 2 }}>
        {folders.map((folder) => (
            <Grid item xs={isTablet ? 4 : 6} key={folder._id}>
                <FolderLinkMobile _id={folder._id} name={folder.name} />
            </Grid>
        ))}
    </Grid>
);

interface Props {
    isNav?: boolean;
}

const FoldersList: React.FC<Props> = ({ isNav = false }) => {
    const { folders } = useFolders();
    const { isDesktop, isTablet } = useMediaQuery();

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
                    fontSize: isNav || !isDesktop ? 24 : 32,
                    marginTop: !isDesktop ? 2 : 0,
                    marginBottom: 2,
                    textDecoration: 'none',
                }}
            >
                Your Folders:
            </Link>
            {!isDesktop ? (
                <MobileFoldersList folders={folders} isTablet={isTablet} />
            ) : (
                <DesktopFoldersList folders={folders} isNav={isNav} />
            )}
        </Box>
    );
};

export default FoldersList;
