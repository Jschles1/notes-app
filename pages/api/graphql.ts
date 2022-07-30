import { ApolloServer, gql } from 'apollo-server-micro';
import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import connectToDatabase from '@lib/server/connectToDatabase';

const getUser = async (db, email) => {
    const user = await db.collection('users').findOne({ email: email });
    return user;
};

const handleGraphQLError = (e) => ({
    code: e.extensions.response.status,
    success: false,
    message: e.extensions.response.body,
});

const handleAuthError = () => ({
    code: 401,
    success: false,
    message: 'Unauthenticated',
});

const typeDefs = gql`
    scalar ISODate

    type Query {
        getFolders(email: String!): GetFoldersResponse!
    }

    type Mutation {
        createFolder(name: String!, email: String!): CreateFolderResponse!
        updateFolder(id: ID!, name: String!, email: String!): UpdateFolderResponse!
        deleteFolder(id: ID!, email: String!): DeleteFolderResponse!
    }

    type User {
        _id: ID!
        email: String!
        name: String!
        image: String
        folders: [Folder]!
    }

    type Folder {
        _id: ID!
        name: String!
        user: ID!
        notes: [Note]!
        createdAt: ISODate
        updatedAt: ISODate
    }

    type Note {
        _id: ID!
        name: String!
        description: String!
        folder: ID!
        createdAt: ISODate
        updatedAt: ISODate
    }

    type GetFoldersResponse {
        code: Int!
        success: Boolean!
        message: String!
        folders: [Folder]!
    }

    type CreateFolderResponse {
        code: Int!
        success: Boolean!
        message: String!
        folder: Folder
    }

    type UpdateFolderResponse {
        code: Int!
        success: Boolean!
        message: String!
        folder: Folder
    }

    type DeleteFolderResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
`;

const resolvers = {
    Query: {
        getFolders: async (_, args, { session, db }) => {
            let response;

            if (session.user.email === args.email) {
                const user = await getUser(db, args.email);

                try {
                    const folders = await db.collection('folders').find({ user: user._id }).toArray();

                    response = {
                        code: 200,
                        success: true,
                        message: `Successfully retrieved folders for ${args.email}`,
                        folders,
                    };
                } catch (e) {
                    response = {
                        ...handleGraphQLError(e),
                        folders: [],
                    };
                }
            } else {
                response = {
                    ...handleAuthError(),
                    folders: [],
                };
            }

            return response;
        },
    },
    Mutation: {
        createFolder: async (_, args, { session, db }) => {
            let response;

            if (session.user.email === args.email) {
                const user = await getUser(db, session.user.email);

                try {
                    const result = await db.collection('folders').insertOne({
                        name: args.name,
                        user: user._id,
                    });
                    response = {
                        code: 200,
                        success: true,
                        message: 'Successfully created new folder',
                        folder: result,
                    };
                } catch (e) {
                    console.log('*e*', e);
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
                    const result = await db.collection('folders').findOneAndUpdate(
                        {
                            _id: new mongoose.Types.ObjectId(id),
                            user: user._id,
                        },
                        { $set: { name: data.name } },
                        { returnNewDocument: true }
                    );
                    response = {
                        code: 200,
                        success: true,
                        message: 'Successfully updated folder',
                        folder: result.value,
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
                    const result = await db.collection('folders').findOneAndDelete({
                        _id: new mongoose.Types.ObjectId(id),
                        user: user._id,
                    });

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
    },
    Folder: {
        notes: async (obj, _, { db }) => {
            const notes = await db.collection('notes').find({ folder: obj._id }).toArray();
            return notes;
        },
    },
};

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

        await db.close();
    } else {
        res.status(401).json({ message: 'Unauthenticated' });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};
