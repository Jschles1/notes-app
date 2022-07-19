import * as React from 'react';
import Button, { ButtonProps } from './Button';

interface Props extends Omit<ButtonProps, 'variant'> {
    variant: 'success' | 'warning';
}

const OptionButton: React.FC<Props> = React.forwardRef(function OptionButton(
    { children, variant, ...other },
    ref
) {
    const color = variant === 'success' ? '#2e7d32' : '#d32f2f';
    return (
        <Button
            color={color}
            ref={ref}
            {...other}
            sx={{
                color: 'secondary.light',
                '&:hover': {
                    backgroundColor: 'secondary.light',
                },
            }}
        >
            {children}
        </Button>
    );
});

export default OptionButton;