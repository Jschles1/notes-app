import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box, styled } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { selectUser } from '../../../store/auth/selectors';
import UserDropdown from './UserDropdown';
import NoteSearchInput from '../../notes/NoteSearchInput';
import FoldersList from '../../folders/FoldersList';
import Button from '../../ui/Button';

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
    const user = useSelector(selectUser);
    const hasNotes = router.pathname.includes('notes');
    const isFoldersPage = router.pathname === '/folders';
    return (
        <NavigationContainer>
            <Box>
                <UserDropdown user={user} />
                {hasNotes && <NoteSearchInput />}
            </Box>
            {!isFoldersPage && <FoldersList isNav />}
            <NextLink href="/create-folder" passHref>
                <Button startIcon={<AddIcon />}>Add New Folder</Button>
            </NextLink>
        </NavigationContainer>
    );
};

export default Navigation;
