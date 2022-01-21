import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/system';
import { Paper, Theme } from '@mui/material';

type Props = {
    children?: ReactNode;
    sx?: SxProps<Theme>;
};

const Card = ({ children, sx = [] }: Props) => {
    return (
        <Paper
            elevation={2}
            sx={[
                {
                    bgcolor: 'bg.main',
                    padding: 2,
                },
                // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Paper>
    );
};

export default Card;
