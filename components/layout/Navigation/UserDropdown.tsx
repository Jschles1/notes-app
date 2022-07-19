import * as React from 'react';
import { signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import NextImage from 'next/image';
import { Box, Menu, MenuItem, ClickAwayListener } from '@mui/material';
import DownIcon from '@mui/icons-material/KeyboardArrowDown';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import UserIcon from '@mui/icons-material/AccountCircleRounded';
import { User } from '../../../interfaces';
import Button from '../../ui/Button';
import ProfileImage from '../../ui/ProfileImage';
import { resetFolders } from '../../../store/folders/reducer';
import { resetNotes } from '../../../store/notes/reducer';

interface Props {
    user: User;
}

const UserDropdown: React.FC<Props> = ({ user }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const buttonRef = React.useRef();
    console.log('user', user);

    const handleSignOut = async () => {
        dispatch(resetFolders());
        dispatch(resetNotes());
        await signOut();
    };

    const toggleOpen = () => {
        setOpen((prev) => !prev);
    };

    return (
        <Box>
            <ClickAwayListener onClickAway={() => setOpen(false)}>
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <Button
                        sx={{
                            width: '100%',
                            fontSize: 20,
                            position: 'relative',
                        }}
                        startIcon={<ProfileImage imageSrc={user.image} />}
                        onClick={toggleOpen}
                        ref={buttonRef}
                        endIcon={open ? <UpIcon /> : <DownIcon />}
                    >
                        {user.name}
                    </Button>
                    <Menu
                        elevation={0}
                        disablePortal
                        open={open}
                        anchorEl={buttonRef.current}
                        container={buttonRef.current}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        onClose={() => setOpen(false)}
                        PaperProps={{
                            style: {
                                width: 268,
                                marginTop: -3.8,
                            },
                        }}
                    >
                        <MenuItem sx={{ fontSize: 16 }} onClick={handleSignOut}>
                            <UserIcon sx={{ marginRight: 1 }} />
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Box>
            </ClickAwayListener>
        </Box>
    );
};

export default UserDropdown;
