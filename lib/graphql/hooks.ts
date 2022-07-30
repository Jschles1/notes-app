import useSWR from 'swr';
import fetcher from '@lib/graphql/fetcher';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import { useSession } from 'next-auth/react';

export const useFolders = () => {
    const session = useSession();
    const query = GET_FOLDERS_QUERY(session.data.user.email);
    const { data, error, mutate } = useSWR(query, fetcher);

    return {
        folders: data?.getFolders?.folders || [],
        isLoading: !data && !error,
        revalidate: () => mutate(query),
        error,
    };
};
