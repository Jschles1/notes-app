import useSWR from 'swr';
import fetcher from '@lib/graphql/fetcher';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';

export const useFolders = (email) => {
    const { data, error } = useSWR(GET_FOLDERS_QUERY(email), fetcher);

    return {
        folders: data?.getFolders?.folders || [],
        isLoading: !data && !error,
        error,
    };
};
