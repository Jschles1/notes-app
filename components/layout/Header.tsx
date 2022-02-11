import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from 'next-auth/react';
import { Box, Alert, Fade, AlertColor } from '@mui/material';
import EventNoteRounded from '@mui/icons-material/EventNoteRounded';
import AccountCircleRounded from '@mui/icons-material/AccountCircleRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';
import HeaderButton from './HeaderButton';
import Card from '../ui/Card';
import Breadcrumbs from './Breadcrumbs';
import CreateButton from './CreateButton';
import { clearAlert } from '../../store/alert/reducer';
import { selectAlert } from '../../store/alert/selectors';

type Props = {
    isLoggedIn: boolean;
};

const Header: FC<Props> = ({ isLoggedIn }) => {
    const dispatch = useDispatch();
    const alert = useSelector(selectAlert);

    const handleSignOut = async () => {
        // TODO: reset folders and notes state
        await signOut();
    };

    const clearAlertDialog = () => {
        dispatch(clearAlert);
    };

    useEffect(() => {
        if (alert.type === 'success') {
            setTimeout(() => dispatch(clearAlert()), 5000);
        }
    }, [alert.type]);

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
            {isLoggedIn ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 2,
                    }}
                >
                    <Breadcrumbs />
                    <Fade in={!!alert.message} appear>
                        <Alert severity={(alert.type as AlertColor) || 'info'} onClose={clearAlertDialog}>
                            {alert.message}
                        </Alert>
                    </Fade>
                </Box>
            ) : null}
        </Box>
    );
};

export default Header;
