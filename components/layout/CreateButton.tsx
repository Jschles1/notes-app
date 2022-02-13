import { useState, FC } from 'react';
import { ClickAwayListener, Box, styled } from '@mui/material';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import CreateRounded from '@mui/icons-material/CreateRounded';
import FolderRounded from '@mui/icons-material/FolderRounded';
import TextSnippetRounded from '@mui/icons-material/TextSnippetRounded';
import HeaderButton from './HeaderButton';
import Link from '../ui/Link';

const CreateButtonOptions = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.bg.main,
        color: theme.palette.primary.main,
        fontSize: 16,
    },
    [`& .${tooltipClasses.arrow}`]: {
        color: theme.palette.bg.main,
    },
}));

const createLinkStyles = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
};

const createLinkIconStyles = {
    marginBottom: '3px',
    marginRight: 1,
};

const CreateButton: FC = () => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const closeOptions = () => {
        setIsOptionsOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={closeOptions}>
            <div>
                <CreateButtonOptions
                    open={isOptionsOpen}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={
                        <Box sx={{ padding: 1 }}>
                            <Box>
                                <Link href="/create-folder" sx={createLinkStyles} onClick={closeOptions}>
                                    <FolderRounded sx={createLinkIconStyles} />
                                    Create Folder
                                </Link>
                            </Box>

                            <Box>
                                <Link href="/create-note" sx={createLinkStyles} onClick={closeOptions}>
                                    <TextSnippetRounded sx={createLinkIconStyles} />
                                    Create Note
                                </Link>
                            </Box>
                        </Box>
                    }
                    arrow
                >
                    <div>
                        <HeaderButton onClick={() => setIsOptionsOpen(true)} sx={{ marginRight: 2 }}>
                            <CreateRounded sx={{ marginRight: 1 }} /> Create
                        </HeaderButton>
                    </div>
                </CreateButtonOptions>
            </div>
        </ClickAwayListener>
    );
};

export default CreateButton;
