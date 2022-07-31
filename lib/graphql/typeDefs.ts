import { gql } from 'apollo-server-micro';

const typeDefs = gql`
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

    interface Response {
        code: Int!
        success: Boolean!
        message: String!
    }

    type GetFoldersResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
        folders: [Folder]!
    }

    type CreateFolderResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
        folder: Folder
    }

    type UpdateFolderResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
        folder: Folder
    }

    type DeleteFolderResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
    }

    type CreateNoteResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
        note: Note
    }

    type UpdateNoteResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
        note: Note
    }

    type DeleteNoteResponse implements Response {
        code: Int!
        success: Boolean!
        message: String!
    }

    input FolderInput {
        name: String!
        email: String!
    }

    input NoteInput {
        name: String!
        description: String!
        email: String!
    }

    type Query {
        getFolders(email: String!): GetFoldersResponse!
    }

    type Mutation {
        createFolder(input: FolderInput!): CreateFolderResponse!
        updateFolder(id: ID!, input: FolderInput!): UpdateFolderResponse!
        deleteFolder(id: ID!, email: String!): DeleteFolderResponse!
        createNote(folderId: ID!, input: NoteInput!): CreateNoteResponse!
        updateNote(noteId: ID!, folderId: ID!, input: NoteInput!): UpdateNoteResponse!
        deleteNote(noteId: ID!, folderId: ID!, email: String!): DeleteNoteResponse!
    }
`;

export default typeDefs;
