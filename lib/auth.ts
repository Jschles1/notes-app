import { getSession } from 'next-auth/react';
import { wrapper } from '@store/index';
import { setUser } from '@store/auth/reducer';

export const serverSideAuthentication = () =>
    wrapper.getServerSideProps((store) => async (ctx): Promise<any> => {
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
