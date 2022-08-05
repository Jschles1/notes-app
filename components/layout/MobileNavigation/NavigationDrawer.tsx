import * as React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@mui/material';
import UserIcon from '@mui/icons-material/AccountCircleRounded';
import FolderIcon from '@mui/icons-material/FolderRounded';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@components/ui/Link';
import AddButton from '@components/ui/AddButton';
import { useStoreActions } from '@store/hooks';

interface Props {
    open: boolean;
    onClose(): void;
    onDeleteFolderClick(): void;
}

const NavigationDrawer: React.FC<Props> = ({ open, onClose, onDeleteFolderClick }) => {
    const setUpdatingFolder = useStoreActions((actions) => actions.setUpdatingFolder);
    const router = useRouter();
    const folderId = router.query.folderId;
    const noteId = router.query.noteId;

    const showFolderOptions = folderId && !noteId;

    const handleSignOut = async () => {
        await signOut();
    };

    const handleUpdateFolderClick = () => {
        onClose();
        setTimeout(() => {
            /* istanbul ignore next */
            setUpdatingFolder(folderId as string);
        }, 0);
    };

    const handleDeleteFolderClick = () => {
        onDeleteFolderClick();
        onClose();
    };

    React.useEffect(() => {
        onClose();
    }, [router.pathname]);

    return (
        <Drawer open={open} anchor="right" onClose={onClose}>
            <Box>
                <List>
                    <Link href="/folders" passHref noLinkStyle>
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
                    <Link href="/create-folder" passHref noLinkStyle>
                        <AddButton variant="drawer" resource="folder" />
                    </Link>
                    {showFolderOptions && (
                        <>
                            <ListItem button onClick={handleUpdateFolderClick}>
                                <ListItemIcon>
                                    <EditIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Update Folder" />
                            </ListItem>
                            <ListItem button onClick={handleDeleteFolderClick}>
                                <ListItemIcon>
                                    <DeleteIcon color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Delete Folder" />
                            </ListItem>
                        </>
                    )}
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
