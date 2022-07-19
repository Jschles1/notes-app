import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextInput from '../ui/TextInput';
import { debounce } from '../../lib/helpers';
import { setSearchQuery } from '../../store/notes/reducer';

const NoteSearchInput: React.FC = () => {
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <Box sx={{ marginTop: 2 }}>
            <TextInput
                placeholder="Search Notes"
                startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
                onChange={debounce(handleSearchChange)}
            />
        </Box>
    );
};

export default NoteSearchInput;
