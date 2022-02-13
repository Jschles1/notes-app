import { Box } from '@mui/material';
import { FC } from 'react';
import Card from '../ui/Card';

interface Props {
    name: string;
    description: string;
}

const Note: FC<Props> = ({ name, description }) => {
    return <Card>Notes</Card>;
};

export default Note;
