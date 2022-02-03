import { Box } from '@mui/material';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { wrapper } from '../../../../store';
import { setUser } from '../../../../store/auth/reducer';
import { fetchNotesInit } from '../../../../store/notes/reducer';

export const getServerSideProps = wrapper.getServerSideProps((store) => async (ctx): Promise<any> => {
    const session = await getSession({ req: ctx.req });

    if (!session) {
        store.dispatch(setUser(null));
        return {
            redirect: {
                destination: '/signin',
                permanent: false,
            },
        };
    }

    store.dispatch(setUser(session.user));

    return {
        props: { session },
    };
});

const NotesPage = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    console.log(router.query.folderId);

    useEffect(() => {
        dispatch(fetchNotesInit(router.query.folderId as string));
    });
    return <Box>Notes Page</Box>;
};

export default NotesPage;
