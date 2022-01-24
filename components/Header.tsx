import { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'next-auth/react';
import { Box } from '@mui/system';
import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import HeaderButton from './HeaderButton';
import { setUser } from '../store/auth/reducer';
import { selectUser } from '../store/auth/selectors';

const Header: FC = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const isLoggedIn = !!user;

    const handleSignOut = async () => {
        dispatch(setUser(null));
        // TODO: reset folders and notes state
        await signOut();
    };

    const renderSignedInButtons = () => (
        <>
            <HeaderButton onClick={handleSignOut}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <AccountCircleRounded sx={{ marginRight: 1 }} /> Sign Out
                </Box>
            </HeaderButton>
        </>
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
            component="header"
        >
            <Box>
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
            </Box>

            <Box>{isLoggedIn ? renderSignedInButtons() : null}</Box>
        </Box>
    );
};

export default Header;
