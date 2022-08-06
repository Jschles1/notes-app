/**
 * @jest-environment node
 */

import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@lib/graphql/typeDefs';
import resolvers from '@lib/graphql/resolvers';
import * as DbHelpers from '@lib/graphql/helpers';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import {
    CREATE_FOLDER_MUTATION,
    UPDATE_FOLDER_MUTATION,
    DELETE_FOLDER_MUTATION,
    CREATE_NOTE_MUTATION,
    UPDATE_NOTE_MUTATION,
    DELETE_NOTE_MUTATION,
} from '@lib/graphql/mutations';

const email = 'admin@email.com';
const userId = '61ba5a19ffecda0337360f3f';
const testNewFolderName = 'New Folder';
const testUpdateFolderName = 'Updated Folder';
const testCreateNoteName = 'Hello';
const testCreateNoteDescription = 'World';
const testUpdateNoteName = 'Hello 2';
const testUpdateNoteDescription = 'World 3';

const mockDbConnection = {
    connection: jest.fn(),
    Folder: jest.fn(),
    Note: {
        find: jest.fn(() => []),
    },
};

const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
        name: 'admin',
        email,
        image: 'https://lh3.googleusercontent.com/a/AATXAJzLlJXt90hZvSHUts5579HkWHGC5-o4xfGeaRk6=s96-c',
    },
};

const testServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ session: mockSession, db: mockDbConnection }),
});

const successResponse = {
    code: 200,
    success: true,
};

const testGetFoldersSuccessResponse = {
    ...successResponse,
    message: `Successfully retrieved folders for ${email}`,
    folders: [
        {
            _id: '61ba5a19ffecda0337360f42',
            name: 'GraphQL Folder',
            notes: [],
            createdAt: null,
            updatedAt: null,
            user: userId,
        },
    ],
};

const testCreateFolderSuccessResponse = {
    ...successResponse,
    message: 'Successfully created new folder',
    folder: {
        name: testNewFolderName,
        notes: [],
        _id: '629e8c7cbaa9862de16e9000',
    },
};

const testUpdateFolderResponse = {
    ...successResponse,
    message: 'Successfully updated folder',
    folder: {
        name: testUpdateFolderName,
        notes: [],
        _id: '61ba5a19ffecda0337360f42',
    },
};

const testCreateNoteSuccessResponse = {
    ...successResponse,
    message: 'Successfully created note',
    note: {
        name: testCreateNoteName,
        description: testCreateNoteDescription,
        folder: '61ba5a19ffecda0337360f42',
        _id: '62b1eef6a7774ff0d1cf3b8d',
        createdAt: null,
        updatedAt: null,
    },
};

const testUpdateNoteSuccessResponse = {
    ...successResponse,
    message: 'Successfully updated note',
    note: {
        name: testUpdateNoteName,
        description: testUpdateNoteDescription,
        folder: '61ba5a19ffecda0337360f42',
        _id: '62b1eef6a7774ff0d1cf3b8d',
        createdAt: null,
        updatedAt: null,
    },
};

describe('GraphQL Resolvers', () => {
    beforeAll(() => {
        jest.spyOn(DbHelpers, 'getUser').mockImplementation(async () => {
            return await Promise.resolve({
                _id: userId,
                email,
                googleProvider: {
                    id: '102573925002563805581',
                    _id: '61ba5a19ffecda0337360f40',
                },
                folders: [],
            });
        });

        jest.spyOn(DbHelpers, 'getFolders').mockImplementation(async () => {
            return await Promise.resolve([
                {
                    _id: '61ba5a19ffecda0337360f42',
                    name: 'GraphQL Folder',
                    notes: [],
                    user: userId,
                },
            ]);
        });

        jest.spyOn(DbHelpers, 'createFolder').mockImplementation(async () => {
            return await Promise.resolve({
                name: testNewFolderName,
                notes: [],
                user: userId,
                _id: '629e8c7cbaa9862de16e9000',
                createdAt: null,
                updatedAt: null,
            });
        });

        jest.spyOn(DbHelpers, 'updateFolder').mockImplementation(async () => {
            return await Promise.resolve({
                name: testUpdateFolderName,
                notes: [],
                user: userId,
                _id: '61ba5a19ffecda0337360f42',
                createdAt: null,
                updatedAt: null,
            });
        });

        jest.spyOn(DbHelpers, 'deleteFolder').mockImplementation(async () => {
            return await Promise.resolve({ ok: true });
        });

        jest.spyOn(DbHelpers, 'createNote').mockImplementation(async () => {
            return await Promise.resolve({
                name: testCreateNoteName,
                description: testCreateNoteDescription,
                folder: '61ba5a19ffecda0337360f42',
                _id: '62b1eef6a7774ff0d1cf3b8d',
                createdAt: null,
                updatedAt: null,
            });
        });

        jest.spyOn(DbHelpers, 'updateNote').mockImplementation(async () => {
            return await Promise.resolve({
                name: testUpdateNoteName,
                description: testUpdateNoteDescription,
                folder: '61ba5a19ffecda0337360f42',
                _id: '62b1eef6a7774ff0d1cf3b8d',
                createdAt: null,
                updatedAt: null,
            });
        });

        jest.spyOn(DbHelpers, 'getFolderById').mockImplementation(async () => {
            return await Promise.resolve({
                name: 'Test Folder',
                _id: '62b1eef6a7774ff0d1cf3b8d',
                user: userId,
                notes: [],
                createdAt: null,
                updatedAt: null,
            });
        });

        jest.spyOn(DbHelpers, 'deleteNote').mockImplementation(async () => {
            return await Promise.resolve();
        });

        jest.spyOn(DbHelpers, 'saveFolderToDatabase').mockImplementation(async () => await Promise.resolve());
        jest.spyOn(DbHelpers, 'saveNoteToDatabase').mockImplementation(async () => await Promise.resolve());
    });

    it('Executes getFoldersQuery without error', async () => {
        const result = await testServer.executeOperation(GET_FOLDERS_QUERY(email));
        expect(result.data.getFolders).toEqual(testGetFoldersSuccessResponse);
    });

    it('Throws GraphQL error on getFoldersQuery error', async () => {
        jest.spyOn(DbHelpers, 'getFolders').mockImplementationOnce(() => {
            throw new Error();
        });
        const result = await testServer.executeOperation(GET_FOLDERS_QUERY(email));
        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });

    it('Throws Unauthenticated error on getFoldersQuery when wrong email is provided', async () => {
        const result = await testServer.executeOperation(GET_FOLDERS_QUERY('wronguser@email.com'));
        expect(result.data.getFolders.code).toBe(401);
        expect(result.data.getFolders.success).toBeFalsy();
        expect(result.data.getFolders.message).toBe('Unauthenticated');
    });

    it('Executes createFolder mutation without error', async () => {
        const result = await testServer.executeOperation(CREATE_FOLDER_MUTATION(testNewFolderName, email));
        expect(result.data.createFolder).toEqual(testCreateFolderSuccessResponse);
    });

    it('Throws GraphQL error on createFolder error', async () => {
        jest.spyOn(DbHelpers, 'createFolder').mockImplementationOnce(() => {
            throw new Error();
        });
        const result = await testServer.executeOperation(CREATE_FOLDER_MUTATION(testNewFolderName, email));
        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });

    it('Throws Unauthenticated error on createFolder when wrong email is provided', async () => {
        const result = await testServer.executeOperation(
            CREATE_FOLDER_MUTATION(testNewFolderName, 'wronguser@email.com')
        );
        expect(result.data.createFolder.code).toBe(401);
        expect(result.data.createFolder.success).toBeFalsy();
        expect(result.data.createFolder.message).toBe('Unauthenticated');
    });

    it('Executes updateFolder mutation without error', async () => {
        const result = await testServer.executeOperation(
            UPDATE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', 'Folder Name', email)
        );
        expect(result.data.updateFolder).toEqual(testUpdateFolderResponse);
    });

    it('Throws Unauthenticated error on updateFolder when wrong email is provided', async () => {
        const result = await testServer.executeOperation(
            UPDATE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', 'Folder Name', 'wronguser@email.com')
        );
        expect(result.data.updateFolder.code).toBe(401);
        expect(result.data.updateFolder.success).toBeFalsy();
        expect(result.data.updateFolder.message).toBe('Unauthenticated');
    });

    it('Throws GraphQL error on updateFolder error', async () => {
        jest.spyOn(DbHelpers, 'updateFolder').mockImplementationOnce(() => {
            throw new Error();
        });
        const result = await testServer.executeOperation(
            UPDATE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', 'Folder Name', email)
        );
        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });

    it('Executes deleteFolder mutation without error', async () => {
        const result = await testServer.executeOperation(DELETE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', email));
        expect(result.data.deleteFolder.code).toBe(200);
        expect(result.data.deleteFolder.success).toBeTruthy();
        expect(result.data.deleteFolder.message).toBe('Successfully deleted folder');
    });

    it('Throws Unauthenticated error on deleteFolder when wrong email is provided', async () => {
        const result = await testServer.executeOperation(
            DELETE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', 'wronguser@email.com')
        );
        expect(result.data.deleteFolder.code).toBe(401);
        expect(result.data.deleteFolder.success).toBeFalsy();
        expect(result.data.deleteFolder.message).toBe('Unauthenticated');
    });

    it('Throws 500 error on deleteFolder when database deletion fails', async () => {
        jest.spyOn(DbHelpers, 'deleteFolder').mockImplementationOnce(async () => {
            return await Promise.resolve({ ok: false });
        });
        const result = await testServer.executeOperation(DELETE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', email));
        expect(result.data.deleteFolder.code).toBe(500);
        expect(result.data.deleteFolder.success).toBeFalsy();
        expect(result.data.deleteFolder.message).toBe('Sorry, something went wrong');
    });

    it('Throws GraphQL error on deleteFolder on error', async () => {
        jest.spyOn(DbHelpers, 'deleteFolder').mockImplementationOnce(() => {
            throw new Error();
        });
        const result = await testServer.executeOperation(DELETE_FOLDER_MUTATION('61ba5a19ffecda0337360f42', email));
        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });

    it('Executes createNote mutation without error', async () => {
        const result = await testServer.executeOperation(
            CREATE_NOTE_MUTATION('61ba5a19ffecda0337360f42', testCreateNoteName, testCreateNoteDescription, email)
        );
        expect(result.data.createNote).toEqual(testCreateNoteSuccessResponse);
    });

    it('Throws Unauthenticated error on createNote when wrong email is provided', async () => {
        const result = await testServer.executeOperation(
            CREATE_NOTE_MUTATION(
                '61ba5a19ffecda0337360f42',
                testCreateNoteName,
                testCreateNoteDescription,
                'wronguser@email.com'
            )
        );
        expect(result.data.createNote.code).toBe(401);
        expect(result.data.createNote.success).toBeFalsy();
        expect(result.data.createNote.message).toBe('Unauthenticated');
    });

    it('Throws Unauthenticated error on createNote if parent folder of new note does not belong to current user', async () => {
        jest.spyOn(DbHelpers, 'getFolderById').mockImplementationOnce(async () => {
            return await Promise.resolve({
                name: 'Test Folder',
                _id: '62b1eef6a7774ff0d1cf3b8d',
                user: 'wrongUser',
                notes: [],
                createdAt: null,
                updatedAt: null,
            });
        });

        const result = await testServer.executeOperation(
            CREATE_NOTE_MUTATION('62b1eef6a7774ff0d1cf3b8d', testCreateNoteName, testCreateNoteDescription, email)
        );
        expect(result.data.createNote.code).toBe(401);
        expect(result.data.createNote.success).toBeFalsy();
        expect(result.data.createNote.message).toBe('Unauthenticated');
    });

    it('Throws GraphQL error on createNote on error', async () => {
        jest.spyOn(DbHelpers, 'createNote').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await testServer.executeOperation(
            CREATE_NOTE_MUTATION('61ba5a19ffecda0337360f42', testCreateNoteName, testCreateNoteDescription, email)
        );

        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });

    it('Executes updateNote mutation without error', async () => {
        const result = await testServer.executeOperation(
            UPDATE_NOTE_MUTATION(
                '62b1eef6a7774ff0d1cf3b8d',
                '61ba5a19ffecda0337360f42',
                testUpdateNoteName,
                testUpdateNoteDescription,
                email
            )
        );
        expect(result.data.updateNote).toEqual(testUpdateNoteSuccessResponse);
    });

    it('Throws Unauthenticated error on updateNote when wrong email is provided', async () => {
        const result = await testServer.executeOperation(
            UPDATE_NOTE_MUTATION(
                '62b1eef6a7774ff0d1cf3b8d',
                '61ba5a19ffecda0337360f42',
                testUpdateNoteName,
                testUpdateNoteDescription,
                'wronguser@email.com'
            )
        );
        expect(result.data.updateNote.code).toBe(401);
        expect(result.data.updateNote.success).toBeFalsy();
        expect(result.data.updateNote.message).toBe('Unauthenticated');
    });

    it('Throws Unauthenticated error on updateNote if parent folder of new note does not belong to current user', async () => {
        jest.spyOn(DbHelpers, 'getFolderById').mockImplementationOnce(async () => {
            return await Promise.resolve({
                name: 'Test Folder',
                _id: '62b1eef6a7774ff0d1cf3b8d',
                user: 'wrongUser',
                notes: [],
                createdAt: null,
                updatedAt: null,
            });
        });

        const result = await testServer.executeOperation(
            UPDATE_NOTE_MUTATION(
                '62b1eef6a7774ff0d1cf3b8d',
                '61ba5a19ffecda0337360f42',
                testUpdateNoteName,
                testUpdateNoteDescription,
                email
            )
        );
        expect(result.data.updateNote.code).toBe(401);
        expect(result.data.updateNote.success).toBeFalsy();
        expect(result.data.updateNote.message).toBe('Unauthenticated');
    });

    it('Throws GraphQL error on updateNote on error', async () => {
        jest.spyOn(DbHelpers, 'updateNote').mockImplementationOnce(() => {
            throw new Error();
        });

        const result = await testServer.executeOperation(
            UPDATE_NOTE_MUTATION(
                '62b1eef6a7774ff0d1cf3b8d',
                '61ba5a19ffecda0337360f42',
                testUpdateNoteName,
                testUpdateNoteDescription,
                email
            )
        );

        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });

    it('Executes deleteNote mutation without error', async () => {
        const result = await testServer.executeOperation(
            DELETE_NOTE_MUTATION('62b1eef6a7774ff0d1cf3b8d', '61ba5a19ffecda0337360f42', email)
        );
        expect(result.data.deleteNote.code).toBe(200);
        expect(result.data.deleteNote.success).toBeTruthy();
        expect(result.data.deleteNote.message).toBe('Successfully deleted note');
    });

    it('Throws Unauthenticated error on deleteNote when wrong email is provided', async () => {
        const result = await testServer.executeOperation(
            DELETE_NOTE_MUTATION('62b1eef6a7774ff0d1cf3b8d', '61ba5a19ffecda0337360f42', 'wronguser@email.com')
        );
        expect(result.data.deleteNote.code).toBe(401);
        expect(result.data.deleteNote.success).toBeFalsy();
        expect(result.data.deleteNote.message).toBe('Unauthenticated');
    });

    it('Throws Unauthenticated error on deleteNote if parent folder of new note does not belong to current user', async () => {
        jest.spyOn(DbHelpers, 'getFolderById').mockImplementationOnce(async () => {
            return await Promise.resolve({
                name: 'Test Folder',
                _id: '62b1eef6a7774ff0d1cf3b8d',
                user: 'wrongUser',
                notes: [],
                createdAt: null,
                updatedAt: null,
            });
        });

        const result = await testServer.executeOperation(
            DELETE_NOTE_MUTATION('62b1eef6a7774ff0d1cf3b8d', '61ba5a19ffecda0337360f42', email)
        );
        expect(result.data.deleteNote.code).toBe(401);
        expect(result.data.deleteNote.success).toBeFalsy();
        expect(result.data.deleteNote.message).toBe('Unauthenticated');
    });

    it('Throws GraphQL error on deleteNote on error', async () => {
        jest.spyOn(DbHelpers, 'deleteNote').mockImplementationOnce(() => {
            throw new Error();
        });
        const result = await testServer.executeOperation(
            DELETE_NOTE_MUTATION('62b1eef6a7774ff0d1cf3b8d', '61ba5a19ffecda0337360f42', email)
        );
        expect(result.data).toBe(null);
        expect(result.errors.length).toBe(1);
    });
});
