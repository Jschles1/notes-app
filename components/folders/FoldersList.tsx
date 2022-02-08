import { FC } from 'react';
import { Grid } from '@mui/material';
import { Folder } from '../../interfaces';
import FolderCard from './FolderCard';

type Props = {
    folders: Folder[];
};

const FoldersList: FC<Props> = ({ folders }) => {
    return (
        <Grid container>
            {folders.map((folder) => (
                <Grid item key={folder._id}>
                    <FolderCard name={folder.name} id={folder._id} />
                </Grid>
            ))}
        </Grid>
    );
};

export default FoldersList;
