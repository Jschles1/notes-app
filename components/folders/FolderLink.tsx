import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import { selectUpdatingFolder } from '@store/folders/selectors';
import { deleteFolderInit, setUpdating } from '@store/folders/reducer';

interface Props extends Omit<Folder, 'user'> {
    isNav?: boolean;
}

const FolderButton: React.FC<Props> = ({ _id, name, isNav = false }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const updatingFolder = useSelector(selectUpdatingFolder);
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
            dispatch(setUpdating(_id));
        }, 100);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setIsOptionsOpen(false);
    };

    const onDeleteFolderConfirm = () => {
        dispatch(deleteFolderInit(_id));
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

export default FolderButton;
