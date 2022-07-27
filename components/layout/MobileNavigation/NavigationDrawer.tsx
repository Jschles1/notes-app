import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import UserIcon from '@mui/icons-material/AccountCircleRounded';
import FolderIcon from '@mui/icons-material/FolderRounded';
import Link from '@components/ui/Link';
import AddButton from '@components/ui/AddButton';
import { resetFolders } from '@store/folders/reducer';
import { resetNotes } from '@store/notes/reducer';

interface Props {
    open: boolean;
    onClose(): void;
}

const NavigationDrawer: React.FC<Props> = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    // TODO: render different links based on router

    const handleSignOut = async () => {
        dispatch(resetFolders());
        dispatch(resetNotes());
        await signOut();
    };

    React.useEffect(() => {
        onClose();
    }, [router.pathname]);

    return (
        <Drawer open={open} anchor="right" onClose={onClose}>
            <Box>
                <List>
                    <Link href="/folders" passHref>
                        <ListItem button component="a">
                            <ListItemIcon>
                                <FolderIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Your Folders" />
                        </ListItem>
                    </Link>
                </List>
                <Divider />
                <List>
                    <Link href="/create-folder" passHref>
                        <AddButton variant="drawer" resource="folder" />
                    </Link>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={handleSignOut}>
                        <ListItemIcon>
                            <UserIcon color="primary" />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default NavigationDrawer;
