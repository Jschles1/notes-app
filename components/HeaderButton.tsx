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
    onClick?(): void;
};

const HeaderCardContentContainer = ({ children }) => (
    <Box
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        }}
    >
        {children}
    </Box>
);

const HeaderButton = ({ children, href, sx, onClick }: Props) => {
    const router = useRouter();

    const isActive = router.pathname === href;

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
                <Card isButton isActive={isActive}>
                    <HeaderCardContentContainer>{children}</HeaderCardContentContainer>
                </Card>
            </Link>
        );
    }

    return (
        <Card isButton onClick={onClick} sx={Array.isArray(sx) ? sx : [sx]}>
            <HeaderCardContentContainer>{children}</HeaderCardContentContainer>
        </Card>
    );
};

export default HeaderButton;
