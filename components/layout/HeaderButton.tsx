import { SxProps, Theme } from '@mui/material';
import { Box } from '@mui/system';
import { ReactNode, FC } from 'react';
import Card from '../ui/Card';
import CardLink from '../ui/CardLink';

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

const HeaderButton: FC<Props> = ({ children, href, sx, onClick }) => {
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
