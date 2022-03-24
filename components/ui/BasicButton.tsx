import * as React from 'react';
import { SxProps, Theme } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const BasicButton: React.FC<Props> = React.forwardRef(function BasicButton(
    props,
    ref
) {
    const { sx, children, ...other } = props;
    return (
        <Button
            disableElevation
            ref={ref}
            variant="contained"
            color="secondary"
            sx={[
                { textTransform: 'unset' },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            {children}
        </Button>
    );
});

export default BasicButton;