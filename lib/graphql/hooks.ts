import useSWR from 'swr';
import fetcher from '@lib/graphql/fetcher';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const useFolders = () => {
    const router = useRouter();
    const session = useSession();
    const query = GET_FOLDERS_QUERY(session.data.user.email);
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
