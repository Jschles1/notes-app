import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Card from '../ui/Card';
import Link from '../ui/Link';
import Skeleton from '../ui/Skeleton';
import { selectSelectedFolder } from '../../store/folders/selectors';
import { findNote } from '../../lib/helpers';
import { selectNotes } from '../../store/notes/selectors';

const BreadcrumbArrow: React.FC = () => <Box sx={{ marginX: 1 }}>{'>'}</Box>;

const Breadcrumbs: React.FC = () => {
    const router = useRouter();
    const selectedFolder = useSelector(selectSelectedFolder);
    const notes = useSelector(selectNotes);
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
                        // justifyContent: 'space-between',
                    }}
                >
                    <Link href={`/folders/${folderId}/notes`}>
                        <Skeleton width="100px">{selectedFolder}</Skeleton>
                    </Link>

                    {!!selectedNote ? (
                        <>
                            <BreadcrumbArrow />
                            <Link href={`/folders/${folderId}/notes/${noteId}`}>
                                <Skeleton width="100px">{selectedNote.name}</Skeleton>
                            </Link>
                        </>
                    ) : null}
                </Box>
            </Box>
        );
    };

    return (
        <Box
            sx={{
                // fontSize: '16px',
                paddingTop: 3,
                paddingBottom: 2,
                // display: 'inline-block',
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
