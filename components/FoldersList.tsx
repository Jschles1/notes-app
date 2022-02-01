import { FC } from 'react';
import { Grid, Box } from '@mui/material';
import { Folder } from '../interfaces';

type Props = {
    folders: Folder[];
};

const FoldersList: FC<Props> = ({ folders }) => {
    return <Box>Folders List</Box>;
};

export default FoldersList;
