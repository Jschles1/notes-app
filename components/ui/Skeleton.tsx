import * as React from 'react';
import { useSelector } from 'react-redux';
import { Skeleton as MuiSkeleton } from '@mui/material';
import { selectIsLoading } from '../../store/loading/selectors';

interface Props {
    children?: React.ReactNode;
}

const Skeleton: React.FC<Props> = ({ children }) => {
    const isLoading = useSelector(selectIsLoading);
    return isLoading ? <MuiSkeleton animation="wave" width="100%" /> : <>{children}</>;
};

export default Skeleton;
