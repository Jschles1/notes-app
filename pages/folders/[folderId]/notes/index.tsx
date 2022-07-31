import * as React from 'react';
import { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import NoteSelection from '@components/notes/NoteSelection';
import AddButton from '@components/ui/AddButton';
import { serverSideAuthentication } from '@lib/auth';
import useMediaQuery from '@lib/hooks/useMediaQuery';
import { selectRedirect } from '@store/history/selectors';

export const getServerSideProps = serverSideAuthentication();

const NotesPage: NextPage = () => {
    const { isDesktop } = useMediaQuery();

    return !isDesktop ? (
        <>
            <NoteSelection />
            <AddButton variant="mobile" resource="note" />
        </>
    ) : null;
};

export default NotesPage;
