import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';

const Header: FC = () => {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <Box
            sx={{
                borderBottomWidth: '1px',
                borderBottomColor: 'secondary.main',
                borderBottomStyle: 'solid',
                padding: 2,
                color: 'secondary.main',
                bgcolor: 'bg.main',
            }}
            component="header"
        >
            <Box>Encora Notes</Box>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </Box>
    );
};

export default Header;
