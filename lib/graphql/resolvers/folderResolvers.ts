const folderResolvers = {
    notes: async (obj, _, { db }) => {
        const notes = await db.Note.find({ folder: obj._id });
        return notes;
    },
};

export default folderResolvers;
