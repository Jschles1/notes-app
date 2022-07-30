import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import TextInput from '@components/ui/TextInput';
import { selectUser } from '@store/auth/selectors';
import { setSelectedFolder, setUpdating, updateFolderInit } from '@store/folders/reducer';
import useMediaQuery from '@lib/hooks/useMediaQuery';

interface Props {
    name: string;
    id: string;
    isNav?: boolean;
}

const UpdateFolderForm: React.FC<Props> = ({ name, id, isNav = false }) => {
    const { isMobile } = useMediaQuery();
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { register, handleSubmit } = useForm({
        defaultValues: React.useMemo(
            () => ({
                name,
            }),
            [name]
        ),
    });

    const onSubmit = (data: { name: string }) => {
        const newName = data.name.trim();
        if (newName && newName !== name) {
            const updatedFolder = { name: newName, _id: id, user: user.id };
            dispatch(updateFolderInit(updatedFolder));
            if (id === router.query.folderId) {
                dispatch(setSelectedFolder(newName));
            }
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

    return (
        <Box
            sx={{
                marginTop: isMobile ? 2 : 'auto',
            }}
        >
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
    );
};

export default UpdateFolderForm;
