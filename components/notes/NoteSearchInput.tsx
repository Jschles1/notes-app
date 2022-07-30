import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextInput from '../ui/TextInput';
import { debounce } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { setSearchQuery } from '@store/notes/reducer';

const NoteSearchInput: React.FC = () => {
    const dispatch = useDispatch();
    const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
    const { isMobile } = useMediaQuery();

    const handleSearchChange = (e) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <Box
            sx={[
                { marginTop: isMobile ? 'auto' : 2 },
                isMobileSearchOpen
                    ? {
                          position: 'absolute',
                          zIndex: 10,
                          width: '100%',
                          top: 0,
                          left: 0,
                      }
                    : {},
            ]}
        >
            {isMobile && !isMobileSearchOpen ? (
                <IconButton>
                    <SearchIcon onClick={() => setIsMobileSearchOpen(true)} />
                </IconButton>
            ) : (
                <TextInput
                    sx={
                        isMobile
                            ? {
                                  height: '53px',
                              }
                            : {}
                    }
                    fullWidth
                    placeholder="Search Notes"
                    startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
                    onChange={debounce(handleSearchChange)}
                />
            )}
        </Box>
    );
};

export default NoteSearchInput;
