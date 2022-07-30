import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Fade, Alert, AlertColor } from '@mui/material';
import { clearAlert } from '../../store/alert/reducer';
import { selectAlert } from '../../store/alert/selectors';

const Notification: React.FC = () => {
    const dispatch = useDispatch();
    const alert = useSelector(selectAlert);

    const clearAlertDialog = () => {
        dispatch(clearAlert);
    };

    React.useEffect(() => {
        if (alert.type === 'success') {
            setTimeout(() => dispatch(clearAlert()), 5000);
        }
    }, [alert.type]);

    return (
        <Box sx={{ position: 'absolute', top: '2%', right: '2%', zIndex: 1101 }}>
            <Fade in={!!alert.message} appear>
                <Alert severity={(alert.type as AlertColor) || 'info'} onClose={clearAlertDialog}>
                    {alert.message}
                </Alert>
            </Fade>
        </Box>
    );
};

export default Notification;
