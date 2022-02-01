import { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import Card from './Card';
import Link from './Link';

type Props = {
    children?: ReactNode;
    href?: string;
    sx?: SxProps<Theme>;
};

const CardLink = ({ children, href, sx }: Props) => {
    const router = useRouter();

    const isActive = router.pathname === href;

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
            <Card isButton isActive={isActive}>
                {children}
            </Card>
        </Link>
    );
};

export default CardLink;
