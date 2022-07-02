import * as React from 'react';
import { useSelector } from 'react-redux';
import { Grid, Box } from '@mui/material';
import { selectFolders } from '../../store/folders/selectors';

const FoldersList: React.FC = () => {
    const folders = useSelector(selectFolders);
    return (
        <Box sx={{ height: '60%', maxHeight: '60%' }}>
            <Box
                sx={{
                    fontWeight: 'bold',
                }}
            >
                Your Folders:
            </Box>
            {/* <Grid container spacing={2}> */}
            <Box sx={{ overflowY: 'scroll', height: '100%' }}>
                {folders.map((folder) => (
                    <Box>{folder.name}</Box>
                ))}
            </Box>
        </Box>
    );
};

export default FoldersList;
