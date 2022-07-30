import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import NavigationDrawer from './NavigationDrawer';
import MobileUserInfo from './MobileUserInfo';
import MobileBreadcrumbs from './MobileBreadcrumbs';
import DeleteConfirmationModal from '@components/ui/DeleteConfirmationModal';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { selectUser } from '@store/auth/selectors';
import { selectSelectedFolder } from '@store/folders/selectors';
import { deleteFolderInit } from '@store/folders/reducer';

const MobileNavigation: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);
    const selectedFolder = useSelector(selectSelectedFolder);
    const [open, setOpen] = React.useState(false);
    const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = React.useState(false);
    const showBreadcrumbs = !!router.query.noteId;

    const onDeleteFolderConfirm = () => {
        dispatch(deleteFolderInit(router.query.folderId as string));
        setIsDeleteFolderModalOpen(false);
    };

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
                    {showBreadcrumbs ? <MobileBreadcrumbs /> : <MobileUserInfo user={user} />}

                    <IconButton color="primary" disableRipple onClick={() => setOpen(true)}>
                        <MoreIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <NavigationDrawer
                open={open}
                onClose={() => setOpen(false)}
                onDeleteFolderClick={() => setIsDeleteFolderModalOpen(true)}
            />

            <DeleteConfirmationModal
                type="Folder"
                open={isDeleteFolderModalOpen}
                name={selectedFolder}
                onConfirm={onDeleteFolderConfirm}
                onClose={() => setIsDeleteFolderModalOpen(false)}
            />
        </>
    );
};

export default MobileNavigation;