import { FC } from 'react';
import { useSelector } from 'react-redux';
import { signOut } from 'next-auth/react';
import { Box } from '@mui/system';
import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import CreateRounded from '@mui/icons-material/CreateRounded';
import TextSnippetRounded from '@mui/icons-material/TextSnippetRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';
import HeaderButton from './HeaderButton';
import { selectUser } from '../store/auth/selectors';

const Header: FC = () => {
    const user = useSelector(selectUser);

    const isLoggedIn = !!user;

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
            <HeaderButton href="/notes" sx={{ marginRight: 2 }}>
                <FolderRounded sx={{ marginRight: 1 }} /> Folders
            </HeaderButton>

            <HeaderButton href="/notes" sx={{ marginRight: 2 }}>
                <TextSnippetRounded sx={{ marginRight: 1 }} /> Notes
            </HeaderButton>

            <HeaderButton onClick={() => {}} sx={{ marginRight: 2 }}>
                {/* TODO: Add Sub menu */}
                <CreateRounded sx={{ marginRight: 1 }} /> Create
            </HeaderButton>

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
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            component="nav"
        >
            <Box>
                <HeaderButton href="/">
                    <EventNoteRounded sx={{ marginRight: 1 }} /> Next Notes
                </HeaderButton>
            </Box>

            {isLoggedIn ? renderSignedInButtons() : null}
        </Box>
    );
};

export default Header;
