/**
 * @jest-environment node
 */

import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@lib/graphql/typeDefs';
import resolvers from '@lib/graphql/resolvers';
import * as DbHelpers from '@lib/graphql/helpers';
import { GET_FOLDERS_QUERY } from '@lib/graphql/queries';
import { CREATE_FOLDER_MUTATION, UPDATE_FOLDER_MUTATION } from '@lib/graphql/mutations';

const email = 'admin@email.com';
const userId = '61ba5a19ffecda0337360f3f';
const testNewFolderName = 'New Folder';
const testUpdateFolderName = 'Updated Folder';

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
});
