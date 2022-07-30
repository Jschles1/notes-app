import * as React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import ArrowIcon from '@mui/icons-material/ArrowBackIos';
import Link from '@components/ui/Link';
import { selectSelectedFolder } from '@store/folders/selectors';

interface Props {}

const MobileBreadcrumbs: React.FC<Props> = ({}) => {
    const router = useRouter();
    const selectedFolder = useSelector(selectSelectedFolder);
    const folderId = router.query.folderId as string;

    return (
        <Box sx={{ flex: 1 }}>
            <Link
                href={`/folders/${folderId}/notes`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 'bold',
                }}
            >
                <ArrowIcon />
                <Box sx={{ marginTop: 0.5 }}>{selectedFolder}</Box>
            </Link>
        </Box>
    );
};

export default MobileBreadcrumbs;
