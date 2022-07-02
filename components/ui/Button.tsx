import * as React from 'react';
import { Button as MuiButton, ButtonProps, SxProps, Theme } from '@mui/material';

interface Props extends Omit<ButtonProps, 'color'> {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    color?: string;
}

const Button: React.FC<Props> = React.forwardRef(function Button({ sx, children, color = '#fff', ...other }, ref) {
    return (
        <MuiButton
            disableElevation
            ref={ref}
            variant="contained"
            sx={[
                {
                    textTransform: 'unset',
                    justifyContent: 'start',
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
