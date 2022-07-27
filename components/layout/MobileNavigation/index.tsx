import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import NavigationDrawer from './NavigationDrawer';
import MobileUserInfo from './MobileUserInfo';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';

import { selectUser } from '../../../store/auth/selectors';

const MobileNavigation: React.FC = () => {
    const router = useRouter();
    const user = useSelector(selectUser);
    const [open, setOpen] = React.useState(false);
    const showBreadcrumbs = router.pathname.includes('/notes');

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
                    {showBreadcrumbs ? null : <MobileUserInfo user={user} />}

                    <IconButton
                        color="primary"
                        disableRipple
                        onClick={() => setOpen(true)}
                    >
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <NavigationDrawer open={open} onClose={() => setOpen(false)} />
        </>
    );
};

export default MobileNavigation;