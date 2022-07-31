import { getUser, handleGraphQLError, handleAuthError } from '../helpers';
import sanitize from '@lib/server/sanitize';

const mutationResolvers = {
    createFolder: async (_, args, { session, db }) => {
        let response;

        if (session.user.email === args.email) {
            const user = await getUser(db, session.user.email);

            try {
                const result = await new db.Folder({
                    name: args.name,
                    user: user._id,
                });
                await result.save();
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
        const { id, name, email } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const data = { name };

            try {
                const result = await db.Folder.findOneAndUpdate({ _id: id, user: user._id }, data, { new: true });
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
                const result = await db.Folder.findOneAndDelete(
                    {
                        _id: id,
                        user: user._id,
                    },
                    { rawResult: true }
                );

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
        const { folderId, name, description, email } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const parentFolder = await db.Folder.findById(folderId);

            if (!!parentFolder && parentFolder.user.toString() === user._id.toString()) {
                const data = {
                    name,
                    description: sanitize(description),
                    folder: folderId,
                };

                try {
                    const result = await new db.Note(data);
                    await result.save();

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
        const { noteId, folderId, name, description, email } = args;
        let response;

        if (session.user.email === email) {
            const user = await getUser(db, session.user.email);
            const parentFolder = await db.Folder.findById(folderId);

            if (!!parentFolder && parentFolder.user.toString() === user._id.toString()) {
                const data = {
                    name,
                    description: sanitize(description),
                };

                try {
                    const note = await db.Note.findOneAndUpdate({ folder: folderId, _id: noteId }, data, {
                        new: true,
                    }).clone();

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
            const parentFolder = await db.Folder.findById(folderId);

            if (!!parentFolder && parentFolder.user.toString() === user._id.toString()) {
                try {
                    await db.Note.findByIdAndDelete(noteId);

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
