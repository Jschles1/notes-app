import * as React from 'react';
import { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';
import Card from '../ui/Card';
import CardLink from '../ui/CardLink';

interface Props {
    children?: React.ReactNode;
    href?: string;
    sx?: SxProps<Theme>;
    onClick?(): void;
}

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

const HeaderButton: React.FC<Props> = ({ children, href, sx, onClick }) => {
    if (href) {
        return (
            <CardLink href={href} sx={Array.isArray(sx) ? sx : [sx]}>
                <HeaderCardContentContainer>{children}</HeaderCardContentContainer>
            </CardLink>
        );
    }

    return (
        <Card isButton onClick={onClick} sx={Array.isArray(sx) ? sx : [sx]}>
            <HeaderCardContentContainer>{children}</HeaderCardContentContainer>
        </Card>
    );
};

export default HeaderButton;
