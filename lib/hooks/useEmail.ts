import { useSession } from 'next-auth/react';

const useEmail = () => {
    const session = useSession();
    return {
        email: session.data.user.email,
    };
};

export default useEmail;
