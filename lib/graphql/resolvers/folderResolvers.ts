import { getNotes } from '@lib/server/dbOperations';

const folderResolvers = {
    notes: async (obj, _, { db }) => {
        const notes = await getNotes(db, obj._id);
        return notes;
    },
};

export default folderResolvers;
