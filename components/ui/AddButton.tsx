import * as React from 'react';
import { useRouter } from 'next/router';
import { Box, ListItem, ListItemIcon, ListItemText, SxProps } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from '@components/ui/Link';
import Button, { ButtonProps } from '@components/ui/Button';

interface Props extends Omit<ButtonProps, 'variant' | 'children'> {
    variant?: 'default' | 'mobile' | 'drawer';
    resource: 'folder' | 'note';
}

export const AddButton: React.FC<Props> = ({ variant = 'default', resource, ...other }) => {
    const router = useRouter();
    const StyledButton =
        variant === 'mobile' ? AddButtonMobile : variant === 'drawer' ? AddButtonDrawer : AddButtonBase;

    const href = resource === 'folder' ? '/create-folder' : `/create-note?folderId=${router.query.folderId}`;

    const text = resource === 'folder' ? 'Add New Folder' : 'Add New Note';

    return (
        <Link href={href} passHref>
            <StyledButton {...other} text={text} />
        </Link>
    );
};

export default AddButton;

const AddButtonBase: React.FC<Omit<ButtonProps, 'children'> & { text: string }> = ({
    fullWidth = true,
    text,
    ...other
}) => (
    <Button startIcon={<AddIcon />} {...other} fullWidth={fullWidth}>
        Add New Folder
    </Button>
);

const AddButtonDrawer: React.FC<{ text: string }> = ({ text }) => (
    <ListItem button>
        <ListItemIcon>
            <AddIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary={text} />
    </ListItem>
);

const AddButtonMobile: React.FC<{ text: string }> = ({ text }) => (
    <AddButtonBase
        text={text}
        color="primary.main"
        fullWidth={false}
        sx={{
            color: 'secondary.light',
            opacity: 1,
            position: 'sticky',
            bottom: '5%',
            margin: '0 auto',
            zIndex: 1100,
            top: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    />
);
