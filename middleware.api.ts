import { withAuth } from 'next-auth/middleware';

// Need to use next-auth signin page until middleware issue fixed by nextjs team
export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            return !!token;
        },
    },
});
