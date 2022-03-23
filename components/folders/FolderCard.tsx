import * as React from 'react';
import { Box } from '@mui/material';
import CardLink from '../ui/CardLink';
import FolderRounded from '@mui/icons-material/FolderRounded';
import DoubleArrowRounded from '@mui/icons-material/DoubleArrowRounded';

interface Props {
    name: string;
    id: string;
}

const FolderCard: React.FC<Props> = ({ name, id }) => {
    return (
        <CardLink
            href={`/folders/${id}/notes`}
            cardSx={{
                height: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <FolderRounded sx={{ marginRight: 1 }} />
                {name}
                <DoubleArrowRounded sx={{ marginLeft: 1 }} />
            </Box>
        </CardLink>
    );
};

export default FolderCard;
