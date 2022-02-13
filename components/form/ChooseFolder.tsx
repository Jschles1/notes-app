import { Box } from '@mui/material';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Folder } from '../../interfaces';

interface Props {
    folders: Folder[];
    onSelect(): void;
}

const ChooseFolder: FC<Props> = ({ folders, onSelect }) => {
    return <Box>Choose Folder</Box>;
};

export default ChooseFolder;
