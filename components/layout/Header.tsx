import { FC } from 'react';
import { signOut } from 'next-auth/react';
import { Box } from '@mui/system';
import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';
import HeaderButton from './HeaderButton';
import Card from '../ui/Card';
import Breadcrumbs from './Breadcrumbs';
import CreateButton from './CreateButton';

type Props = {
    isLoggedIn: boolean;
};

const Header: FC<Props> = ({ isLoggedIn }) => {
    const handleSignOut = async () => {
        // TODO: reset folders and notes state
        await signOut();
    };

    const renderSignedInButtons = () => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <HeaderButton href="/folders" sx={{ marginRight: 2 }}>
                <FolderRounded sx={{ marginRight: 1 }} /> Home
            </HeaderButton>

            <CreateButton />

            <HeaderButton onClick={handleSignOut}>
                <AccountCircleRounded sx={{ marginRight: 1 }} /> Sign Out
            </HeaderButton>
        </Box>
    );

    return (
        <Box
            sx={{
                paddingTop: 2,
                paddingBottom: 2,
                paddingLeft: 4,
                paddingRight: 4,
                color: 'secondary.main',
                bgcolor: 'transparent',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
                component="nav"
            >
                <Box>
                    <Card>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <EventNoteRounded sx={{ marginRight: 1 }} /> Next Notes
                        </Box>
                    </Card>
                </Box>

                {isLoggedIn ? renderSignedInButtons() : null}
            </Box>
            {isLoggedIn ? <Breadcrumbs /> : null}
        </Box>
    );
};

export default Header;
