import * as React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton as MuiSkeleton, SkeletonProps } from '@mui/material';
import { selectIsLoading } from '../../store/loading/selectors';

interface Props extends SkeletonProps {
    children?: React.ReactNode;
    width?: string;
}

const Skeleton: React.FC<Props> = ({ children, width = '100%' }) => {
    const isLoading = useSelector(selectIsLoading);
    return isLoading ? <MuiSkeleton animation="wave" width={width} /> : <>{children}</>;
};

export default Skeleton;
