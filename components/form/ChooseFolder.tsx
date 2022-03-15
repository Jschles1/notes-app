import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector } from 'react-redux';
import Edit from '@mui/icons-material/Edit';
import FolderRounded from '@mui/icons-material/FolderRounded';
import SaveRounded from '@mui/icons-material/SaveRounded';
import { Box, Select, Typography, MenuItem, InputLabel, FormControl } from '@mui/material';
import { Folder } from '../../interfaces';
import { selectIsLoading } from '../../store/loading/selectors';
import BasicButton from '../ui/BasicButton';
import Card from '../ui/Card';
import Skeleton from '../ui/Skeleton';

interface Props {
    folders: Folder[];
    onSelect(data): void;
    selectedFolder?: string;
    setIsChoosingFolder(bool): void;
    isChoosingFolder: boolean;
}

const ChooseFolder: React.FC<Props> = ({
    folders,
    onSelect,
    selectedFolder,
    isChoosingFolder,
    setIsChoosingFolder,
}) => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            folder: '',
        },
    });
    const isLoading = useSelector(selectIsLoading);

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
                <Skeleton>
                    <FolderRounded
                        sx={{
                            marginRight: 1,
                            fontSize: '28px',
                            verticalAlign: 'text-top',
                        }}
                    />{' '}
                    {selectedFolder}
                </Skeleton>
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
