import * as React from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import Link from '../ui/Link';
import Skeleton from '../ui/Skeleton';
import { findNote } from '@lib/helpers';
import { useFolders } from '@lib/graphql/hooks';

const BreadcrumbArrow: React.FC = () => (
    <Box sx={{ marginX: 1 }} data-testid="arrow">
        {'>'}
    </Box>
);

const Breadcrumbs: React.FC = () => {
    const router = useRouter();
    const { selectedFolder } = useFolders();
    /* istanbul ignore next */
    const notes = selectedFolder?.notes || [];
    const { folderId, noteId } = router.query;
    const selectedNote = React.useMemo(() => findNote(notes, noteId), [noteId, notes]);

    const renderBreadcrumbs = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'space-around',
                    }}
                >
                    <Link href={`/folders/${folderId}/notes`}>
                        <Skeleton width="100px">
                            {
                                /* istanbul ignore next */
                                selectedFolder?.name
                            }
                        </Skeleton>
                    </Link>

                    {
                        /* istanbul ignore next */
                        !!selectedNote ? (
                            <>
                                <BreadcrumbArrow />
                                <Link href={`/folders/${folderId}/notes/${noteId}`}>
                                    <Skeleton width="100px">{selectedNote.name}</Skeleton>
                                </Link>
                            </>
                        ) : null
                    }
                </Box>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                paddingTop: 3,
                paddingBottom: 2,
                borderBottom: '2px solid',
                borderColor: 'bg.main',
                fontWeight: 'bold',
            }}
        >
            {renderBreadcrumbs()}
        </Box>
    );
};

export default Breadcrumbs;
