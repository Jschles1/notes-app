import Edit from '@mui/icons-material/Edit';
import FolderRounded from '@mui/icons-material/FolderRounded';
import { Box, Select, Skeleton, Typography } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Folder } from '../../interfaces';
import { selectIsLoading } from '../../store/loading/selectors';
import BasicButton from '../ui/BasicButton';
import Card from '../ui/Card';

interface Props {
    folders: Folder[];
    onSelect(): void;
    selectedFolder?: string;
    selectedFolderId?: string;
}

const ChooseFolder: FC<Props> = ({ folders, onSelect, selectedFolder, selectedFolderId }) => {
    const { register, handleSubmit } = useForm();
    const isLoading = useSelector(selectIsLoading);
    const [isChoosingFolder, setIsChoosingFolder] = useState(!(selectedFolder && selectedFolder));

    const renderChoosingFolder = () => <Box>Please choose a folder</Box>;

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
