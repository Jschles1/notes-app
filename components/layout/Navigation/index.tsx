import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, styled } from '@mui/material';
import UserDropdown from './UserDropdown';
import LoadingIndicator from '@components/ui/LoadingIndicator';
import NoteSearchInput from '@components/notes/NoteSearchInput';
import FoldersList from '@components/folders/FoldersList';
import AddButton from '@components/ui/AddButton';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';

const NavigationContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    width: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.bg.main,
    padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
}));

const Navigation: React.FC = () => {
    const router = useRouter();
    const { user, isLoading } = useLoggedInUser();
    const hasNotes = router.pathname.includes('notes');
    const isFoldersPage = router.pathname === '/folders';

    return (
        <NavigationContainer data-testid="desktop-nav-container">
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <>
                    <Box>
                        <UserDropdown user={user} />
                        {hasNotes && <NoteSearchInput />}
                    </Box>
                    {!isFoldersPage && <FoldersList isNav />}
                </>
            )}
            <AddButton resource="folder" />
        </NavigationContainer>
    );
};

export default Navigation;
