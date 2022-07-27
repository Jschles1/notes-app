import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Box, Collapse, Grid, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderRounded';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { Folder } from '../../interfaces';
import Skeleton from '@components/ui/Skeleton';
import Button from '@components/ui/Button';
import TextInput from '@components/ui/TextInput';
import Link from '@components/ui/Link';
import DeleteConfirmationModal from '@components/ui/DeleteConfirmationModal';
import { selectUpdatingFolder } from '@store/folders/selectors';
import { deleteFolderInit, setUpdating, updateFolderInit } from '@store/folders/reducer';
import { selectUser } from '@store/auth/selectors';

interface Props extends Omit<Folder, 'user'> {
    isNav?: boolean;
}

const FolderButton: React.FC<Props> = ({ _id, name, isNav = false }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const updatingFolder = useSelector(selectUpdatingFolder);
    const user = useSelector(selectUser);
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const { register, handleSubmit } = useForm({
        defaultValues: React.useMemo(
            () => ({
                name,
            }),
            [name]
        ),
    });

    const folderId = router.query.folderId as string;
    const isSelected = folderId && folderId === _id;

    const handleIconClick = () => {
        setIsOptionsOpen((prev) => !prev);
    };

    const handeUpdateClick = () => {
        setIsOptionsOpen(false);
        dispatch(setUpdating(_id));
    };

    const onSubmit = (data: { name: string }) => {
        const newName = data.name.trim();
        if (newName && newName !== name) {
            const updatedFolder = { name: newName, _id, user: user.id };
            dispatch(updateFolderInit(updatedFolder));
        } else {
            dispatch(setUpdating(''));
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 13) {
            handleSubmit(onSubmit)();
        }
    };

    const handleBlur = () => {
        handleSubmit(onSubmit)();
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
                        <Box>
                            <TextInput
                                variant={isNav ? 'white' : 'gray'}
                                autoFocus
                                required
                                {...register('name')}
                                name="name"
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                sx={{
                                    width: '100%',
                                }}
                            />
                        </Box>
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
