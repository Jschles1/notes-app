import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Box } from '@mui/material';
import TextInput from '@components/ui/TextInput';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';
import { UPDATE_FOLDER_MUTATION } from '@lib/graphql/mutations';
import fetcher from '@lib/graphql/fetcher';
import { useFolders } from '@lib/graphql/hooks';
import { useStoreActions } from '@store/hooks';

interface Props {
    name: string;
    id: string;
    isNav?: boolean;
}

const UpdateFolderForm: React.FC<Props> = ({ name, id, isNav = false }) => {
    const { isDesktop } = useMediaQuery();
    const setUpdatingFolder = useStoreActions((actions) => actions.setUpdatingFolder);
    const setAlert = useStoreActions((actions) => actions.setAlert);
    const { email } = useLoggedInUser();
    const { revalidate } = useFolders();
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
            /* istanbul ignore next */
            if (response?.updateFolder?.success) {
                revalidate();
                setAlert({
                    type: 'success',
                    message: 'Folder Successfully Updated!',
                });
                setUpdatingFolder('');
            } else {
                setAlert({
                    type: 'error',
                    message: `Error updating folder: ${response?.updateFolder?.message}`,
                });
            }
        } else {
            setUpdatingFolder('');
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
