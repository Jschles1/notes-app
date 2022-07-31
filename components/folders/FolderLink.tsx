import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, Collapse, Grid, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderRounded';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { Folder } from '../../interfaces';
import Skeleton from '@components/ui/Skeleton';
import Button from '@components/ui/Button';
import Link from '@components/ui/Link';
import DeleteConfirmationModal from '@components/ui/DeleteConfirmationModal';
import UpdateFolderForm from '@components/form/UpdateFolderForm';
import { DELETE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import fetcher from '@lib/graphql/fetcher';
import { useStoreActions, useStoreState } from '@store/hooks';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';
import { useFolders } from '@lib/graphql/hooks';

interface Props extends Omit<Folder, 'user'> {
    isNav?: boolean;
}

const FolderButton: React.FC<Props> = ({ _id, name, isNav = false }) => {
    const setUpdatingFolder = useStoreActions((actions) => actions.setUpdatingFolder);
    const setAlert = useStoreActions((actions) => actions.setAlert);
    const router = useRouter();
    const { email } = useLoggedInUser();
    const { revalidate } = useFolders();
    const updatingFolder = useStoreState((state) => state.updatingFolder);
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const folderId = router.query.folderId as string;
    const isSelected = folderId && folderId === _id;

    const handleIconClick = () => {
        setIsOptionsOpen((prev) => !prev);
    };

    const handeUpdateClick = () => {
        setIsOptionsOpen(false);
        setTimeout(() => {
            setUpdatingFolder(_id);
        }, 100);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsOptionsOpen(false);
    };

    const onDeleteFolderConfirm = async () => {
        const mutation = DELETE_FOLDER_MUTATION(_id, email);
        const response = await fetcher(mutation);
        if (response?.deleteFolder?.success) {
            setIsModalOpen(false);

            await revalidate();

            setAlert({
                type: 'success',
                message: 'Folder Successfully Deleted!',
            });

            if (window.location.href.includes(_id)) {
                router.push('/folders');
            }
        } else {
            setAlert({
                type: 'error',
                message: `Error deleting folder: ${response?.deleteFolder?.message}`,
            });

            setIsModalOpen(false);
        }
    };

    const isUpdatingFolder = !!updatingFolder;
    const isUpdatingCurrentFolder = updatingFolder === _id;
    const changeColor = isNav ? 'secondary.light' : 'bg.main';
    const optionButtonVariant = changeColor === 'secondary.light' ? 'bg.main' : 'secondary.light';

    return (
        <>
            <Skeleton>
                <Box
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: isOptionsOpen || isSelected ? changeColor : 'transparent',
                        '&:hover': {
                            backgroundColor: isUpdatingFolder ? 'transparent' : changeColor,
                        },
                        paddingX: isUpdatingCurrentFolder ? 0 : 1,
                        cursor: isUpdatingFolder ? 'auto' : 'pointer',
                    }}
                >
                    {isUpdatingCurrentFolder ? (
                        <UpdateFolderForm isNav={isNav} name={name} id={_id} />
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Link
                                href={`/folders/${_id}/notes`}
                                sx={{
                                    textDecoration: 'none',
                                    pointerEvents: isUpdatingFolder ? 'none' : 'inherit',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}
                                >
                                    <FolderIcon sx={{ marginRight: 1 }} />
                                    {name}
                                </Box>
                            </Link>
                            <IconButton
                                color="primary"
                                disableRipple
                                onClick={handleIconClick}
                                disabled={isUpdatingCurrentFolder}
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box>
                    )}
                    <Collapse in={isOptionsOpen}>
                        <Grid container spacing={1} sx={{ paddingBottom: 1 }}>
                            <Grid item xs={6}>
                                <Button fullWidth color={optionButtonVariant} onClick={handeUpdateClick}>
                                    Update
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button fullWidth color={optionButtonVariant} onClick={() => setIsModalOpen(true)}>
                                    Delete
                                </Button>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Box>
            </Skeleton>

            <DeleteConfirmationModal
                type="Folder"
                open={isModalOpen}
                name={name}
                onConfirm={onDeleteFolderConfirm}
                onClose={handleModalClose}
            />
        </>
    );
};

export default React.memo(FolderButton);
