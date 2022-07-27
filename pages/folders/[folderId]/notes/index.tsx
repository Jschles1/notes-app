import * as React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import NoteSelection from '@components/notes/NoteSelection';
import AddButton from '@components/ui/AddButton';
import { serverSideAuthentication } from '@lib/auth';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { fetchNotesInit } from '@store/notes/reducer';
import { selectRedirect } from '@store/history/selectors';
import { clearRedirect } from '@store/history/reducer';

export const getServerSideProps = serverSideAuthentication();

const NotesPage: NextPage = () => {
    const dispatch = useDispatch();
    const successRedirect = useSelector(selectRedirect);
    const { isMobile } = useMediaQuery();
    const router = useRouter();

    const folderId = router.query.folderId as string;

    React.useEffect(() => {
        dispatch(fetchNotesInit(folderId));
    }, [folderId]);

    React.useEffect(() => {
        if (successRedirect) {
            router.push(successRedirect);
            dispatch(clearRedirect());
        }
    }, [successRedirect, dispatch]);

    return isMobile ? (
        <>
            <NoteSelection />
            <AddButton variant="mobile" resource="note" />
        </>
    ) : null;
};

export default NotesPage;