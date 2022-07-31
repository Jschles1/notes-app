import { ApolloServer } from 'apollo-server-micro';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import typeDefs from '@lib/graphql/typeDefs';
import resolvers from '@lib/graphql/resolvers';
import connectToDatabase from '@lib/server/connectToDatabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (session) {
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Origin', 'https://studio.apollographql.com');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

        if (req.method === 'OPTIONS') {
            res.end();
            return false;
        }

        const db = await connectToDatabase();

        const apolloServer = await new ApolloServer({
            typeDefs,
            resolvers,
            context: () => ({ session, db }),
        });

        await apolloServer.start();
        await apolloServer.createHandler({
            path: '/api/graphql',
        })(req, res);

        await db.connection.close();
    } else {
        res.status(401).json({ message: 'Unauthenticated' });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
