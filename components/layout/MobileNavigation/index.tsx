import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import { Box, AppBar, Toolbar, IconButton } from '@mui/material';
import NavigationDrawer from './NavigationDrawer';
import MobileUserInfo from './MobileUserInfo';
import MobileBreadcrumbs from './MobileBreadcrumbs';
import DeleteConfirmationModal from '@components/ui/DeleteConfirmationModal';
import NoteSearchInput from '@components/notes/NoteSearchInput';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { selectUser } from '@store/auth/selectors';
import { selectSelectedFolder } from '@store/folders/selectors';
import { deleteFolderInit } from '@store/folders/reducer';
import { DELETE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import fetcher from '@lib/graphql/fetcher';
import useEmail from '@lib/hooks/useEmail';
import { setAlert } from '@store/alert/reducer';

const MobileNavigation: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(selectUser);
    const { email } = useEmail();
    const selectedFolder = useSelector(selectSelectedFolder);
    const [open, setOpen] = React.useState(false);
    const [isDeleteFolderModalOpen, setIsDeleteFolderModalOpen] = React.useState(false);
    const showBreadcrumbs = !!router.query.noteId || router.pathname === '/create-note';
    const showSearch = !!router.query.folderId && !router.query.noteId && router.pathname !== '/create-note';

    const onDeleteFolderConfirm = async () => {
        const id = router.query.folderId as string;
        const mutation = DELETE_FOLDER_MUTATION(id, email);
        const response = await fetcher(mutation);
        if (response.deleteFolder.success) {
            setIsDeleteFolderModalOpen(false);

            mutate(GET_FOLDERS_QUERY(email));

            dispatch(
                setAlert({
                    type: 'success',
                    message: 'Folder Successfully Deleted!',
                })
            );

            if (window.location.href.includes(id)) {
                router.push('/folders');
            }
        }
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
                    position: 'relative',
                }}
            >
                <Toolbar sx={{ borderBottom: '2px solid #eee' }}>
                    {showBreadcrumbs ? <MobileBreadcrumbs /> : <MobileUserInfo user={user} />}

                    <Box sx={{ display: 'flex' }}>
                        {showSearch && <NoteSearchInput />}
                        <IconButton color="primary" disableRipple onClick={() => setOpen(true)}>
                            <MoreIcon />
                        </IconButton>
                    </Box>
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
