import { getUser, getFolders, handleGraphQLError, handleAuthError } from '../../server/dbOperations';

const queryResolvers = {
    getFolders: async (_, args, { session, db }) => {
        let response;

        if (session.user.email === args.email) {
            const user = await getUser(db, args.email);

            try {
                const folders = await getFolders(db, user._id);

                response = {
                    code: 200,
                    success: true,
                    message: `Successfully retrieved folders for ${args.email}`,
                    folders,
                };
            } catch (e) {
                response = {
                    ...handleGraphQLError(e),
                    folders: [],
                };
            }
        } else {
            response = {
                ...handleAuthError(),
                folders: [],
            };
        }

        return response;
    },
};

export default queryResolvers;
