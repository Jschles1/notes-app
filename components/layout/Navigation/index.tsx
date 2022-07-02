import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box, styled } from '@mui/material';
import { selectUser } from '../../../store/auth/selectors';
import UserDropdown from './UserDropdown';

const NavigationContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.bg.main,
    padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
}));

const Navigation: React.FC = () => {
    const user = useSelector(selectUser);
    const isLoggedIn = !!user;
    return (
        <NavigationContainer>
            {isLoggedIn ? (
                <>
                    <UserDropdown user={user} />
                </>
            ) : null}
        </NavigationContainer>
    );
};

export default Navigation;
