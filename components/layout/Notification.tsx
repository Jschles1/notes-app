import * as React from 'react';
import { Box, Fade, Alert, AlertColor } from '@mui/material';
import { useStoreState, useStoreActions } from '@store/hooks';

const Notification: React.FC = () => {
    const alert = useStoreState((state) => state.alert);
    const clearAlert = useStoreActions((actions) => actions.clearAlert);

    const clearAlertDialog = () => {
        clearAlert();
    };

    React.useEffect(() => {
        if (alert.type === 'success') {
            setTimeout(() => clearAlert(), 5000);
        }
    }, [alert.type]);

    return (
        !!alert.message && (
            <Box
                sx={{
                    position: 'absolute',
                    top: '2%',
                    right: '2%',
                    zIndex: 1101,
                }}
            >
                <Fade in={!!alert.message} appear>
                    <Alert
                        severity={
                            /* istanbul ignore next */
                            (alert.type as AlertColor) || 'info'
                        }
                        onClose={clearAlertDialog}
                    >
                        {alert.message}
                    </Alert>
                </Fade>
            </Box>
        )
    );
};

export default Notification;
