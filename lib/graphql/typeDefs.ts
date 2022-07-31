import { gql } from 'apollo-server-micro';

const typeDefs = gql`
    type Query {
        getFolders(email: String!): GetFoldersResponse!
    }
    type Mutation {
        createFolder(name: String!, email: String!): CreateFolderResponse!
        updateFolder(id: ID!, name: String!, email: String!): UpdateFolderResponse!
        deleteFolder(id: ID!, email: String!): DeleteFolderResponse!
        createNote(folderId: ID!, name: String!, description: String!, email: String!): CreateNoteResponse!
        updateNote(noteId: ID!, folderId: ID!, name: String!, description: String!, email: String!): UpdateNoteResponse!
        deleteNote(noteId: ID!, folderId: ID!, email: String!): DeleteNoteResponse!
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
        createdAt: String
        updatedAt: String
    }
    type Note {
        _id: ID!
        name: String!
        description: String!
        folder: ID!
        createdAt: String
        updatedAt: String
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
    type CreateNoteResponse {
        code: Int!
        success: Boolean!
        message: String!
        note: Note
    }
    type UpdateNoteResponse {
        code: Int!
        success: Boolean!
        message: String!
        note: Note
    }
    type DeleteNoteResponse {
        code: Int!
        success: Boolean!
        message: String!
    }
`;

export default typeDefs;
