import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Box, Toolbar, IconButton } from '@mui/material';
import NavigationDrawer from './NavigationDrawer';
import ProfileImage from '../../ui/ProfileImage';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import { selectUser } from '../../../store/auth/selectors';

const MobileNavigation: React.FC = () => {
    const user = useSelector(selectUser);
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <AppBar
                elevation={0}
                position="sticky"
                sx={{
                    backgroundColor: 'secondary.light',
                    color: 'primary.main',
                    boxShadow: 'none',
                }}
            >
                <Toolbar sx={{ borderBottom: '2px solid #eee' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flex: 1,
                            alignItems: 'center',
                        }}
                    >
                        <ProfileImage imageSrc={user?.image} height={32} width={32} />
                        <Box
                            sx={{
                                fontSize: '18px',
                                marginLeft: 2,
                                fontWeight: 'bold',
                            }}
                        >
                            {user?.name}
                        </Box>
                    </Box>

                    <IconButton color="primary" disableRipple onClick={() => setOpen(true)}>
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <NavigationDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default MobileNavigation;
