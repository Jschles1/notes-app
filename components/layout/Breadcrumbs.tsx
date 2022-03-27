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
                    alignItems: 'space-around',
                    justifyContent: 'space-between',
                }}
            >
                <Link href="/folders">Your Folders</Link>

                {folderId && selectedFolder ? (
                    <>
                        <BreadcrumbArrow />
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

                        {router.pathname === '/create-note' ? (
                            <>
                                <BreadcrumbArrow />
                                <Link href={`/create-note?folderId=${folderId}`}>Create Note</Link>
                            </>
                        ) : null}
                    </>
                ) : null}

                {router.pathname === '/create-folder' ? (
                    <>
                        <BreadcrumbArrow />
                        <Link href="/create-folder">Create Folder</Link>
                    </>
                ) : null}

                {!folderId && router.pathname === '/create-note' ? (
                    <>
                        <BreadcrumbArrow />
                        <Link href="/create-note">Choose Folder</Link>
                    </>
                ) : null}
            </Box>
        );
    };

    return (
        <Card
            sx={{
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
