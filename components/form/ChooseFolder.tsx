import Edit from '@mui/icons-material/Edit';
import FolderRounded from '@mui/icons-material/FolderRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import { Box, Select, Skeleton, Typography, MenuItem, InputLabel, FormControl } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Folder } from '../../interfaces';
import { selectIsLoading } from '../../store/loading/selectors';
import BasicButton from '../ui/BasicButton';
import Card from '../ui/Card';

interface Props {
    folders: Folder[];
    onSelect(data): void;
    selectedFolder?: string;
    setIsChoosingFolder(bool): void;
    isChoosingFolder: boolean;
}

const ChooseFolder: FC<Props> = ({ folders, onSelect, selectedFolder, isChoosingFolder, setIsChoosingFolder }) => {
    const { register, handleSubmit, formState, watch, control } = useForm({
        defaultValues: {
            folder: '',
        },
    });
    const isLoading = useSelector(selectIsLoading);

    // Test
    useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);

    const renderChoosingFolder = () => (
        <>
            <Box sx={{ width: '50%' }}>
                <FormControl fullWidth>
                    <Controller
                        name="folder"
                        control={control}
                        render={({ field: { onChange, value, name, ref } }) => (
                            <>
                                <InputLabel id="folder-select">Please Select a Folder:</InputLabel>
                                <Select
                                    name={name}
                                    labelId="folder-select"
                                    inputRef={ref}
                                    onChange={onChange}
                                    value={value}
                                    // error={}
                                    label="Please Select a Folder:"
                                >
                                    <MenuItem disabled value=""></MenuItem>
                                    {folders.map((folder) => (
                                        <MenuItem key={folder._id} value={folder.name}>
                                            {folder.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </>
                        )}
                        rules={{ required: true }}
                    />
                </FormControl>
            </Box>

            <Box>
                <BasicButton startIcon={<SaveRounded />} onClick={handleSubmit(onSelect)}>
                    Save
                </BasicButton>
            </Box>
        </>
    );

    const renderChosenFolder = () => (
        <>
            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{
                    minWidth: '40%',
                }}
            >
                {isLoading ? (
                    <Skeleton animation="wave" width="100%" />
                ) : (
                    <>
                        <FolderRounded
                            sx={{
                                marginRight: 1,
                                fontSize: '28px',
                                verticalAlign: 'text-top',
                            }}
                        />{' '}
                        {selectedFolder}
                    </>
                )}
            </Typography>

            <BasicButton
                sx={{ marginRight: 1 }}
                onClick={() => setIsChoosingFolder(true)}
                startIcon={<Edit />}
                disabled={isLoading}
            >
                Change Folder
            </BasicButton>
        </>
    );

    return (
        <Card sx={{ marginBottom: 2 }}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {isChoosingFolder ? renderChoosingFolder() : renderChosenFolder()}
            </Box>
        </Card>
    );
};

export default ChooseFolder;
