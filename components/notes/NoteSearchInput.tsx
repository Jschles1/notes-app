import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import TextInput from '../ui/TextInput';
import { debounce } from '@lib/helpers';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { useStoreActions } from '@store/hooks';

const NoteSearchInput: React.FC = () => {
    const setSearchQuery = useStoreActions((actions) => actions.setSearchQuery);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = React.useState(false);
    const { isDesktop } = useMediaQuery();

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchClose = () => {
        setSearchQuery('');
        setIsMobileSearchOpen(false);
    };

    return (
        <Box
            sx={[
                { marginTop: !isDesktop ? 'auto' : 2 },
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
            {!isDesktop && !isMobileSearchOpen ? (
                <IconButton onClick={() => setIsMobileSearchOpen(true)}>
                    <SearchIcon />
                </IconButton>
            ) : (
                <TextInput
                    sx={[
                        {
                            height: {
                                xs: '53px',
                                sm: '63px',
                                lg: 'auto',
                            },
                        },
                        !isDesktop
                            ? {
                                  outline: 'none !important',
                                  border: 'none !important',
                                  borderRadius: 0,
                              }
                            : {},
                    ]}
                    fullWidth
                    placeholder="Search Notes"
                    startAdornment={<SearchIcon sx={{ marginRight: 1 }} />}
                    endAdornment={!isDesktop ? <CloseIcon onClick={handleSearchClose} /> : null}
                    onChange={debounce(handleSearchChange)}
                />
            )}
        </Box>
    );
};

export default NoteSearchInput;
