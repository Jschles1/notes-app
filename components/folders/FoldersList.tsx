import * as React from 'react';
import { Grid } from '@mui/material';
import { Folder } from '../../interfaces';
import FolderCard from './FolderCard';

interface Props {
    folders: Folder[];
}

const FoldersList: React.FC<Props> = ({ folders }) => {
    return (
        <Grid container spacing={2}>
            {folders.map((folder) => (
                <Grid item key={folder._id} xs={3}>
                    <FolderCard name={folder.name} id={folder._id} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FoldersList;
