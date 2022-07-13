import * as React from 'react';
import { OutlinedInput, OutlinedInputProps, OutlinedInputClasses, styled, outlinedInputClasses } from '@mui/material';

const CustomInput = styled(OutlinedInput, {
    shouldForwardProp: (prop) => prop !== 'variant',
})<{ variant: 'white' | 'gray' }>(({ theme, variant }) => ({
    // fontFamily: theme.typography.fontFamily,
    // color: theme.palette.primary.main,
    // padding: theme.spacing(1),
    // fontSize: 16,
    // display: 'block',
    // width: '100%',
    // borderRadius: 4,
    // border: 'none',
    backgroundColor: variant === 'white' ? theme.palette.secondary.light : theme.palette.secondary.main,
    border: 'none',
    '&:hover': {
        // [`& .${outlinedInputClasses.notchedOutline}`]: {
        //     borderColor: theme.palette.secondary.main,
        // },
    },
    '&:focus': {
        // outline: `0.5px outset ${theme.palette.secondary.main}`,
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: 'transparent',
        borderWidth: '1px !important',
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
