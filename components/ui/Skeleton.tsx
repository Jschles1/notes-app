import * as React from 'react';
import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material';
import { useFolders } from '@lib/graphql/hooks';

interface Props extends SkeletonProps {
    children?: React.ReactNode;
    width?: string;
}

const Skeleton: React.FC<Props> = ({ children, width = '100%' }) => {
    const { isLoading } = useFolders();
    return isLoading ? <MuiSkeleton animation="wave" width={width} /> : <>{children}</>;
};

export default Skeleton;
