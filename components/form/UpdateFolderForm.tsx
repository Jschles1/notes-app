import * as React from 'react';
import { mutate } from 'swr';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import TextInput from '@components/ui/TextInput';
import { setSelectedFolder, setUpdating } from '@store/folders/reducer';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import useEmail from '@lib/hooks/useEmail';
import { UPDATE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import fetcher from '@lib/graphql/fetcher';
import { setAlert } from '@store/alert/reducer';

interface Props {
    name: string;
    id: string;
    isNav?: boolean;
}

const UpdateFolderForm: React.FC<Props> = ({ name, id, isNav = false }) => {
    const { isDesktop } = useMediaQuery();
    const router = useRouter();
    const dispatch = useDispatch();
    const { email } = useEmail();
    const { register, handleSubmit } = useForm({
        defaultValues: React.useMemo(
            () => ({
                name,
            }),
            [name]
        ),
    });

    const onSubmit = async (data: { name: string }) => {
        const newName = data.name.trim();
        if (newName && newName !== name) {
            const mutation = UPDATE_FOLDER_MUTATION(id, newName, email);
            const response = await fetcher(mutation);
            if (response.updateFolder.success) {
                mutate(GET_FOLDERS_QUERY(email));
                dispatch(
                    setAlert({
                        type: 'success',
                        message: 'Folder Successfully Updated!',
                    })
                );
                dispatch(setUpdating(''));
                if (id === router.query.folderId) {
                    dispatch(setSelectedFolder(newName));
                }
            } else {
                // TODO: handle error
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
                marginTop: !isDesktop ? 2 : 'auto',
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
