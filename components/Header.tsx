import { FC } from 'react';
import { Box } from '@mui/system';

const Header: FC = () => {
    return (
        <Box
            sx={{
                borderBottom: '1px solid black',
            }}
            component="header"
        >
            Header
        </Box>
    );
};

export default Header;
