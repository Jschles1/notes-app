import { FC, ReactNode } from 'react';
import { Box, SxProps } from '@mui/system';
import { Paper, Theme } from '@mui/material';

type Props = {
    children?: ReactNode;
    sx?: SxProps<Theme>;
    isButton?: boolean;
    onClick?(): void;
};

const Card = ({ children, sx = [], isButton = false, onClick }: Props) => {
    return (
        <Paper
            onClick={onClick}
            elevation={0}
            sx={[
                {
                    bgcolor: 'bg.main',
                    color: 'primary.main',
                    padding: 2,
                    transition: 'background-color 250ms',
                },
                isButton && {
                    '&:hover': {
                        color: '#fff !important',
                        bgcolor: 'secondary.main',
                        cursor: 'pointer',
                    },
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
