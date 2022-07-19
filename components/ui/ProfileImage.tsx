import * as React from 'react';
import NextImage from 'next/image';
import { Box } from '@mui/material';

interface Props {
    imageSrc: string;
    width?: number;
    height?: number;
}

const ProfileImage: React.FC<Props> = ({ imageSrc, height = 25, width = 25 }) => (
    <Box
        sx={{
            display: 'inline-flex',
            borderRadius: '100%',
            overflow: 'hidden',
        }}
    >
        <NextImage src={imageSrc} width={width} height={height} />
    </Box>
);

export default React.memo(ProfileImage);
