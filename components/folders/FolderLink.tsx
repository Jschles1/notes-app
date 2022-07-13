import * as React from 'react';
import NextLink from 'next/link';
import { Box, Collapse, Grid, IconButton } from '@mui/material';
import FolderIcon from '@mui/icons-material/FolderRounded';
import MoreIcon from '@mui/icons-material/MoreHorizRounded';
import { Folder } from '../../interfaces';
import Skeleton from '../ui/Skeleton';
import Button from '../ui/Button';

interface Props extends Omit<Folder, 'user'> {
    isNav?: boolean;
}

const FolderButton: React.FC<Props> = ({ _id, name, isNav = false }) => {
    const [isOptionsOpen, setIsOptionsOpen] = React.useState(false);

    const handleIconClick = () => {
        setIsOptionsOpen((prev) => !prev);
    };

    const changeColor = isNav ? 'secondary.light' : 'bg.main';
    const optionButtonVariant = changeColor === 'secondary.light' ? 'bg.main' : 'secondary.light';

    return (
        <Skeleton>
            <Box
                sx={{
                    borderRadius: '4px',
                    backgroundColor: isOptionsOpen ? changeColor : 'transparent',
                    '&:hover': {
                        backgroundColor: changeColor,
                    },
                    paddingX: 1,
                    cursor: 'pointer',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <NextLink href={`/folders/${_id}/notes`} passHref>
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
                    </NextLink>
                    <IconButton color="primary" disableRipple onClick={handleIconClick}>
                        <MoreIcon />
                    </IconButton>
                </Box>
                {/* TODO: Options (Update and Delete) */}
                <Collapse in={isOptionsOpen}>
                    <Grid container spacing={1} sx={{ paddingBottom: 1 }}>
                        <Grid item xs={6}>
                            <Button fullWidth color={optionButtonVariant}>
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
