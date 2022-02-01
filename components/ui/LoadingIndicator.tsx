import { CircularProgress, Box } from '@mui/material';
import Card from '../Card';

const centerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const LoadingIndicator = () => {
    return (
        <Box
            sx={{
                ...centerStyles,
                height: '100%',
            }}
        >
            <Card sx={centerStyles}>
                <CircularProgress size={70} />
            </Card>
        </Box>
    );
};

export default LoadingIndicator;
