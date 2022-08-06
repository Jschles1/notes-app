export const getUser = async (db, email) => {
    const user = await db.User.findOne({ email });
    return user;
};

export const getFolders = async (db, id) => {
    const folders = await db.Folder.find({
        user: id,
    });
    return folders;
};

export const createFolder = async (db, userId, name) => {
    const result = await new db.Folder({
        name,
        user: userId,
    });
    return result;
};

export const saveFolderToDatabase = async (folder) => {
    await folder.save();
};

export const updateFolder = async (db, folderId, userId, data: { name: string }) => {
    const result = await db.Folder.findOneAndUpdate({ _id: folderId, user: userId }, data, { new: true });
    return result;
};

export const deleteFolder = async (db, folderId, userId) => {
    const result = await db.Folder.findOneAndDelete(
        {
            _id: folderId,
            user: userId,
        },
        { rawResult: true }
    );
    return result;
};

export const getFolderById = async (db, folderId) => {
    const result = await db.Folder.findById(folderId);
    return result;
};

export const createNote = async (db, data: { name: string; description: string }) => {
    const result = await new db.Note(data);
    return result;
};

export const saveNoteToDatabase = async (note) => {
    await note.save();
};

export const updateNote = async (db, folderId, noteId, data: { name: string; description: string }) => {
    const note = await db.Note.findOneAndUpdate({ folder: folderId, _id: noteId }, data, {
        new: true,
    }).clone();
    return note;
};

export const deleteNote = async (db, noteId) => {
    await db.Note.findByIdAndDelete(noteId);
};

export const handleGraphQLError = (e) => ({
    code: e.extensions.response.status,
    success: false,
    message: e.extensions.response.body,
});

export const handleAuthError = () => ({
    code: 401,
    success: false,
    message: 'Unauthenticated',
});
