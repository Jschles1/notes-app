import {
    getUser,
    createFolder,
    saveFolderToDatabase,
    updateFolder,
    deleteFolder,
    getFolderById,
    createNote,
    saveNoteToDatabase,
    updateNote,
    deleteNote,
    handleGraphQLError,
    handleAuthError,
} from '../helpers';
import sanitize from '@lib/server/sanitize';

const mutationResolvers = {
    createFolder: async (_, args, { session, db }) => {
        let response;

        if (session.user.email === args.input.email) {
            const user = await getUser(db, session.user.email);

            try {
                const result = await createFolder(db, user._id, args.input.name);
                await saveFolderToDatabase(result);
                response = {
                    code: 200,
                    success: true,
                    message: 'Successfully created new folder',
                    folder: result,
                };
            } catch (e) {
                response = {
                    ...handleGraphQLError(e),
                    folder: null,
                };
            }
        } else {
            response = {
                ...handleAuthError(),
                folder: null,
            };
        }

        return response;
    },
    updateFolder: async (_, args, { session, db }) => {
        const {
            id,
            input: { name, email },
        } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const data = { name };

            try {
                const result = await updateFolder(db, id, user._id, data);
                response = {
                    code: 200,
                    success: true,
                    message: 'Successfully updated folder',
                    folder: result,
                };
            } catch (e) {
                response = {
                    ...handleGraphQLError(e),
                    folder: null,
                };
            }
        } else {
            response = {
                ...handleAuthError(),
                folder: null,
            };
        }

        return response;
    },
    deleteFolder: async (_, args, { session, db }) => {
        const { id, email } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);

            try {
                const result = await deleteFolder(db, id, user._id);

                if (result.ok) {
                    response = {
                        code: 200,
                        success: true,
                        message: 'Successfully deleted folder',
                    };
                } else {
                    response = {
                        code: 500,
                        success: false,
                        message: 'Sorry, something went wrong',
                    };
                }
            } catch (e) {
                response = handleGraphQLError(e);
            }
        } else {
            response = handleAuthError();
        }

        return response;
    },
    createNote: async (_, args, { session, db }) => {
        const {
            folderId,
            input: { name, description, email },
        } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const parentFolder = await getFolderById(db, folderId);

            if (!!parentFolder && parentFolder.user.toString() === user._id.toString()) {
                const data = {
                    name,
                    description: sanitize(description),
                    folder: folderId,
                };

                try {
                    const result = await createNote(db, data);
                    await saveNoteToDatabase(result);

                    response = {
                        code: 200,
                        success: true,
                        message: 'Successfully created note',
                        note: result,
                    };
                } catch (e) {
                    response = handleGraphQLError(e);
                }
            } else {
                response = handleAuthError();
            }
        } else {
            response = handleAuthError();
        }

        return response;
    },
    updateNote: async (_, args, { session, db }) => {
        const {
            noteId,
            folderId,
            input: { name, description, email },
        } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const parentFolder = await getFolderById(db, folderId);

            if (!!parentFolder && parentFolder.user.toString() === user._id.toString()) {
                const data = {
                    name,
                    description: sanitize(description),
                };

                try {
                    const note = await updateNote(db, folderId, noteId, data);

                    response = {
                        code: 200,
                        success: true,
                        message: 'Successfully updated note',
                        note,
                    };
                } catch (e) {
                    response = handleGraphQLError(e);
                }
            } else {
                response = handleAuthError();
            }
        } else {
            response = handleAuthError();
        }

        return response;
    },
    deleteNote: async (_, args, { session, db }) => {
        const { noteId, folderId, email } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const parentFolder = await getFolderById(db, folderId);

            if (!!parentFolder && parentFolder.user.toString() === user._id.toString()) {
                try {
                    await deleteNote(db, noteId);

                    response = {
                        code: 200,
                        success: true,
                        message: 'Successfully deleted note',
                    };
                } catch (e) {
                    response = handleGraphQLError(e);
                }
            } else {
                response = handleAuthError();
            }
        } else {
            response = handleAuthError();
        }

        return response;
    },
};

export default mutationResolvers;
