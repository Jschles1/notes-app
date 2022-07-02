import * as React from 'react';
import { useSelector } from 'react-redux';
import { Stack, Box } from '@mui/material';
import FolderLink from './FolderLink';
import { selectFolders } from '../../store/folders/selectors';

interface Props {
    isNav?: boolean;
}

const FoldersList: React.FC<Props> = ({ isNav = false }) => {
    const folders = useSelector(selectFolders);
    const containerHeight = isNav ? '60%' : '100%';
    return (
        <Box
            sx={{
                height: containerHeight,
                maxHeight: containerHeight,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    fontWeight: 'bold',
                    fontSize: isNav ? 24 : 32,
                    marginBottom: 2,
                }}
            >
                Your Folders:
            </Box>
            <Stack
                sx={{
                    overflowY: 'auto',
                    flex: 1,
                }}
                spacing={2}
            >
                {folders.map((folder) => (
                    <FolderLink _id={folder._id} name={folder.name} isNav={isNav} />
                ))}
            </Stack>
        </Box>
    );
};

export default FoldersList;
