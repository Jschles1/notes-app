import * as React from 'react';
import { SxProps } from '@mui/system';
import { Paper, PaperProps, Theme } from '@mui/material';

interface Props extends PaperProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    isButton?: boolean;
    isActive?: boolean;
    onClick?(): void;
}

const Card = React.forwardRef<HTMLDivElement, Props>(function Card(
    { children, sx = [], isButton = false, isActive = false, onClick = () => {} }: Props,
    ref
) {
    return (
        <Paper
            ref={ref}
            onClick={onClick}
            elevation={0}
            sx={[
                isButton && isActive
                    ? {
                          color: '#fff !important',
                          bgcolor: 'primary.main',
                          cursor: 'pointer',
                          padding: 2,
                      }
                    : {
                          bgcolor: 'bg.main',
                          color: 'primary.main',
                          padding: 2,
                          transition: 'background-color 250ms',
                      },
                isButton && {
                    '&:hover': {
                        color: '#fff !important',
                        bgcolor: 'primary.main',
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
});

export default Card;
