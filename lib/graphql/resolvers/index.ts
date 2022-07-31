import folderResolvers from './folderResolvers';
import mutationResolvers from './mutationResolvers';
import queryResolvers from './queryResolvers';

const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    Folder: folderResolvers,
};

export default resolvers;
