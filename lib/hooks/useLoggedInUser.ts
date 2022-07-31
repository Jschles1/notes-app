import { useSession } from 'next-auth/react';

const useLoggedInUser = () => {
    const session = useSession();
    const user = session?.data?.user || null;
    const email = user && user.email;
    const isLoading = session.status === 'loading';
    return {
        user,
        email: email || '',
        isLoading,
    };
};

export default useLoggedInUser;
