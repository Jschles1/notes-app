import { useMediaQuery as useMuiMediaQuery, Theme } from '@mui/material';

const useMediaQuery = () => {
    const isMobile = useMuiMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
    const isTablet = useMuiMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    const isDesktop = useMuiMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

    return {
        isMobile,
        isTablet: isTablet && !isMobile,
        isDesktop,
    };
};

export default useMediaQuery;
