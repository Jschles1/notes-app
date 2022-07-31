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
                Folder: () => ({
                    _id: '123',
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
