import * as React from 'react';
import { OutlinedInput, OutlinedInputProps, styled, outlinedInputClasses } from '@mui/material';

const CustomInput = styled(OutlinedInput, {
    shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'white' | 'gray' }>(({ theme, variant }) => ({
    backgroundColor: variant === 'white' ? theme.palette.secondary.light : theme.palette.bg.main,
    border: 'none',
    [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: 'transparent',
        borderWidth: '1px !important',
        [theme.breakpoints.down('sm')]: {
            border: 'none !important',
        },
    },
    [`& .Mui-focused.${outlinedInputClasses.notchedOutline}`]: {
        borderWidth: 5,
    },
}));

interface Props extends OutlinedInputProps {
    variant?: 'white' | 'gray';
}

const TextInput = React.forwardRef(function TextInput(
    { variant = 'white', ...props }: Props,
    ref: React.ForwardedRef<HTMLInputElement>
) {
    return <CustomInput {...props} ref={ref} variant={variant} />;
});

export default TextInput;
