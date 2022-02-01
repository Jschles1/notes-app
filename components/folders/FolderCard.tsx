import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import CardLink from '../CardLink';
import FolderRounded from '@mui/icons-material/FolderRounded';
import DoubleArrowRounded from '@mui/icons-material/DoubleArrowRounded';

type Props = {
    name: string;
    id: string;
};

const FolderCard: FC<Props> = ({ name, id }) => {
    return (
        <CardLink
            href={`/folders/${id}`}
            cardSx={{
                height: 100,
                width: 300,
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
