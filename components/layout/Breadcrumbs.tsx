import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Card from '../ui/Card';
import Link from '../ui/Link';
import { selectSelectedFolder } from '../../store/folders/selectors';

const BreadcrumbArrow = () => <Box sx={{ marginX: 1 }}>{'>'}</Box>;

const Breadcrumbs = () => {
    const router = useRouter();
    const selectedFolder = useSelector(selectSelectedFolder);
    const { folderId } = router.query;

    const renderBreadcrumbs = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'space-around',
                    justifyContent: 'space-between',
                }}
            >
                <Link href="/folders">Your Folders</Link>
                {folderId && selectedFolder ? (
                    <>
                        <BreadcrumbArrow />
                        <Link href={`/folders/${folderId}/notes`}>{selectedFolder}</Link>
                    </>
                ) : null}
            </Box>
        );
    };

    return (
        <Card
            sx={{
                marginTop: 2,
                fontSize: '12px',
                paddingY: 1,
                display: 'inline-block',
            }}
        >
            {renderBreadcrumbs()}
        </Card>
    );
};

export default Breadcrumbs;
