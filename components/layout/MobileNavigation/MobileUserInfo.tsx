import * as React from 'react';
import { Box } from '@mui/material';
import ProfileImage from '@components/ui/ProfileImage';
import { User } from '../../../interfaces';

interface Props {
    user: User;
}

const MobileUserInfo: React.FC<Props> = ({ user }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                alignItems: 'center',
            }}
        >
            <ProfileImage imageSrc={user?.image} height={32} width={32} />
            <Box
                sx={{
                    fontSize: '18px',
                    marginLeft: 2,
                    fontWeight: 'bold',
                }}
            >
                {user?.name}
            </Box>
        </Box>
    );
};

export default MobileUserInfo;
