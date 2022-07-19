import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps, SxProps, Theme } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'color'> {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    color?: string;
}

const Button: React.FC<ButtonProps> = React.forwardRef(function Button(
    { sx, children, color = '#fff', ...other },
    ref
) {
    return (
        <MuiButton
            disableElevation
            ref={ref}
            variant="contained"
            sx={[
                {
                    textTransform: 'unset',
                    backgroundColor: color,
                    color: 'primary.main',
                    '&:hover': {
                        backgroundColor: color,
                        color: 'primary.main',
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {children}
        </MuiButton>
    );
});

export default Button;
