import useSWR from 'swr';
import fetcher from '@lib/graphql/fetcher';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import { useRouter } from 'next/router';
import useLoggedInUser from '@lib/hooks/useLoggedInUser';

export const useFolders = () => {
    const router = useRouter();
    const { email } = useLoggedInUser();
    const query = GET_FOLDERS_QUERY(email);
    const { data, error, mutate } = useSWR(query, fetcher);

    const folderId = router.query.folderId as string;
    const folders = data?.getFolders?.folders || [];
    const selectedFolder = folderId ? folders.find((f) => f._id === folderId) : null;

    return {
        folders,
        selectedFolder,
        isLoading: !data && !error,
        revalidate: () => mutate(query),
        error,
    };
};
