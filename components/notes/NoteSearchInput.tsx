import * as React from 'react';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextInput from '../ui/TextInput';

const NoteSearchInput: React.FC = () => {
    return (
        <Box sx={{ marginTop: 2 }}>
            <TextInput placeholder="Search Notes" startAdornment={<SearchIcon sx={{ marginRight: 1 }} />} />
        </Box>
    );
};

export default NoteSearchInput;
