import { FC, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';

interface Props extends ButtonProps {
    children: ReactNode;
    sx?: SxProps<Theme>;
}

const BasicButton: FC<Props> = (props) => {
    const { sx, children, ...other } = props;
    return (
        <Button
            disableElevation
            variant="contained"
            color="secondary"
            sx={[{ textTransform: 'unset' }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...other}
        >
            {children}
        </Button>
    );
};

export default BasicButton;
