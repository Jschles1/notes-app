import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NextLink from 'next/link';
import { useForm } from 'react-hook-form';
import { Box, Collapse, Grid, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderRounded';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { Folder } from '../../interfaces';
import Skeleton from '../ui/Skeleton';
import Button from '../ui/Button';
import TextInput from '../ui/TextInput';
import Link from '../ui/Link';
import { selectUpdatingFolder } from '../../store/folders/selectors';
import { setUpdating, updateFolderInit } from '../../store/folders/reducer';
import { selectUser } from '../../store/auth/selectors';

interface Props extends Omit<Folder, 'user'> {
    isNav?: boolean;
}

const FolderButton: React.FC<Props> = ({ _id, name, isNav = false }) => {
    const dispatch = useDispatch();
    const updatingFolder = useSelector(selectUpdatingFolder);
    const user = useSelector(selectUser);
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);
    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: React.useMemo(
            () => ({
                name,
            }),
            [name]
        ),
    });

    // console.log('isUpdating', isUpdating);

    const handleIconClick = () => {
        setIsOptionsOpen((prev) => !prev);
    };

    const handeUpdateClick = () => {
        setIsOptionsOpen(false);
        dispatch(setUpdating(_id));
        // Add is updating folder global state
    };

    const onSubmit = (data: { name: string }) => {
        const newName = data.name.trim();
        if (newName && newName !== name) {
            // Make API call
            //   if (name && onUpdate) {
            //     onUpdate(data);
            //   } else if (onCreate) {
            //     onCreate(data);
            //   }
            const updatedFolder = { name: newName, _id, user: user.id };
            dispatch(updateFolderInit(updatedFolder));
        } else {
            // unmount component
            //   onCancel();
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

    const isUpdatingFolder = !!updatingFolder;
    const isUpdatingCurrentFolder = updatingFolder === _id;
    const changeColor = isNav ? 'secondary.light' : 'bg.main';
    const optionButtonVariant = changeColor === 'secondary.light' ? 'bg.main' : 'secondary.light';

    return (
        <Skeleton>
            <Box
                sx={{
                    borderRadius: '4px',
                    backgroundColor: isOptionsOpen ? changeColor : 'transparent',
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
                            <Button fullWidth color={optionButtonVariant}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </Collapse>
            </Box>
        </Skeleton>
    );
};

export default FolderButton;
