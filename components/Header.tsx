import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { Box } from '@mui/system';
import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import HeaderButton from './HeaderButton';

const Header: FC = () => {
    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <Box
            sx={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 4,
                paddingRight: 4,
                color: 'secondary.main',
                bgcolor: 'transparent',
                display: 'flex',
            }}
            component="header"
        >
            <HeaderButton href="/">
                <Box
                    sx={{
                        fontWeight: 'bold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <EventNoteRounded sx={{ marginRight: 1 }} /> Next Notes
                </Box>
            </HeaderButton>
            {/* <Button onClick={handleSignOut}>Sign Out</Button> */}
        </Box>
    );
};

export default Header;
