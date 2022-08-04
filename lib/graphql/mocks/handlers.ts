import { rest } from 'msw';
import { ApolloServer } from 'apollo-server-micro';
import typeDefs from '@lib/graphql/typeDefs';
import resolvers from '@lib/graphql/resolvers';

export const handlers = [
    rest.post('/api/graphql', async (req, res, ctx) => {
        // Set up mock apollo server and pass request
        const apolloServer = await new ApolloServer({
            typeDefs,
            resolvers,
            mocks: {
                Response: () => ({
                    code: 200,
                    success: true,
                    message: 'success',
                }),
                GetFoldersResponse: () => ({
                    code: 200,
                    success: true,
                    message: 'success',
                    folders: [
                        {
                            _id: '123',
                            name: 'Folder Name',
                            user: '321',
                            createdAt: '1649370960451',
                            updatedAt: '1649370960451',
                            notes: [
                                {
                                    _id: '234',
                                    name: 'Note Name',
                                    description: 'Note Description',
                                    folder: '123',
                                    createdAt: '1649370960451',
                                    updatedAt: '1649370960451',
                                },
                            ],
                        },
                    ],
                }),
                UpdateFolderResponse: () => ({
                    code: 200,
                    success: true,
                    message: 'success',
                    folder: {
                        _id: '123',
                        name: 'Folder Name',
                        user: '321',
                        createdAt: '1649370960451',
                        updatedAt: '1649370960451',
                        notes: [
                            {
                                _id: '234',
                                name: 'Note Name',
                                description: 'Note Description',
                                folder: '123',
                                createdAt: '1649370960451',
                                updatedAt: '1649370960451',
                            },
                        ],
                    },
                }),
                DeleteFolderResponse: () => ({
                    code: 200,
                    success: true,
                    message: 'success',
                }),
                UpdateNoteResponse: () => ({
                    code: 200,
                    success: true,
                    message: 'success',
                    note: {
                        _id: '234',
                        name: 'Note Name',
                        description: 'Note Description',
                        folder: '123',
                        createdAt: '1649370960451',
                        updatedAt: '1649370960451',
                    },
                }),
                DeleteNoteResponse: () => ({
                    code: 200,
                    success: true,
                    message: 'success',
                }),
            },
        });

        const result = await apolloServer.executeOperation({
            query: (req.body as any).query,
            variables: (req.body as any).variables,
        });

        return res(ctx.json(result));
    }),
];