import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import Card from '../ui/Card';
import Link from '../ui/Link';
import { selectSelectedFolder } from '../../store/folders/selectors';
import { findNote } from '../../lib/helpers';
import { selectNotes } from '../../store/notes/selectors';

const BreadcrumbArrow: React.FC = () => <Box sx={{ marginX: 1 }}>{'>'}</Box>;

const Breadcrumbs: React.FC = () => {
    const router = useRouter();
    const selectedFolder = useSelector(selectSelectedFolder);
    const notes = useSelector(selectNotes);
    const { folderId, noteId } = router.query;
    const selectedNote = React.useMemo(() => findNote(notes, noteId), [noteId]);

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

                        {!!selectedNote ? (
                            <>
                                <BreadcrumbArrow />
                                <Link href={`/folders/${folderId}/notes/${noteId}`}>{selectedNote.name}</Link>
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
