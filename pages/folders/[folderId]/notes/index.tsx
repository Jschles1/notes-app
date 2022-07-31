import * as React from 'react';
import { NextPage } from 'next';
import NoteSelection from '@components/notes/NoteSelection';
import AddButton from '@components/ui/AddButton';
import useMediaQuery from '@lib/hooks/useMediaQuery';

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
