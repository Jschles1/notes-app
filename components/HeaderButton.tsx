import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';
import Card from './Card';
import Link from './Link';

type Props = {
    children?: ReactNode;
    href?: string;
    sx?: SxProps<Theme>;
    onClick?(): void;
};

const HeaderButton = ({ children, href, sx, onClick }: Props) => {
    if (href) {
        return (
            <Link
                href={href}
                sx={[
                    {
                        textDecoration: 'none',
                    },
                    // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                <Card isButton>{children}</Card>
            </Link>
        );
    }

    return (
        <Card isButton onClick={onClick} sx={Array.isArray(sx) ? sx : [sx]}>
            {children}
        </Card>
    );
};

export default HeaderButton;
