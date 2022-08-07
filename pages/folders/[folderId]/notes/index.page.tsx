import * as React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import useMediaQuery from '@lib/hooks/useMediaQuery';

const NoteSelection = dynamic(() => import('@components/notes/NoteSelection'));
const AddButton = dynamic(() => import('@components/ui/AddButton'));

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
