import * as React from 'react';
import Button, { ButtonProps } from './Button';
import { SxProps, Theme } from '@mui/material';

interface Props extends Omit<ButtonProps, 'variant'> {
    variant: 'success' | 'warning';
    sx?: SxProps<Theme>;
}

const OptionButton: React.FC<Props> = React.forwardRef(function OptionButton({ children, variant, sx, ...other }, ref) {
    const color = variant === 'success' ? '#2e7d32' : '#d32f2f';
    return (
        <Button
            color={color}
            ref={ref}
            {...other}
            sx={[
                {
                    color: 'secondary.light',
                    '&:hover': {
                        backgroundColor: 'secondary.light',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            {children}
        </Button>
    );
});

export default OptionButton;
