export const CREATE_FOLDER_MUTATION = (name: string, email: string) => ({
    query: `
    mutation CreateFolder($input: FolderInput!) { 
      createFolder(input: $input) { 
        code 
        success 
        message 
        folder { 
          _id 
          name
          notes {
            _id
            name
            description
            folder
            createdAt
            updatedAt
          }
        } 
      } 
    }
  `,
    variables: { input: { name, email } },
});

export const UPDATE_FOLDER_MUTATION = (id: string, name: string, email: string) => ({
    query: `
    mutation UpdateFolder($id: ID!, $input: FolderInput!) {
      updateFolder(id: $id, input: $input) {
        code
        success
        message
        folder {
          _id
          name
          notes {
            _id
            name
            description
            folder
            createdAt
            updatedAt
          }
        }
      }
    }
  `,
    variables: { id, input: { name, email } },
});

export const DELETE_FOLDER_MUTATION = (id: string, email: string) => ({
    query: `
    mutation DeleteFolder($id: ID!, $email: String!) {
      deleteFolder(id: $id, email: $email) {
        code
        success
        message
      }
    }
  `,
    variables: { id, email },
});

export const CREATE_NOTE_MUTATION = (folderId: string, name: string, description: string, email: string) => ({
    query: `
    mutation CreateNote($folderId: ID!, $input: NoteInput!) {
      createNote(folderId: $folderId, input: $input) {
        code
        success
        message
        note {
          _id
          name
          description
          folder
          createdAt
          updatedAt
        }
      }
    }
  `,
    variables: { folderId, input: { name, description, email } },
});

export const UPDATE_NOTE_MUTATION = (
    noteId: string,
    folderId: string,
    name: string,
    description: string,
    email: string
) => ({
    query: `
  mutation UpdateNote($noteId: ID!, $folderId: ID!, $input: NoteInput! ) {
    updateNote(noteId: $noteId, folderId: $folderId, input: $input) {
      code
      success
      message
      note {
        _id
        name
        description
        folder
        createdAt
        updatedAt
      }
    }
  }
`,
    variables: { noteId, folderId, input: { name, description, email } },
});

export const DELETE_NOTE_MUTATION = (noteId: string, folderId: string, email: string) => ({
    query: `
  mutation DeleteNote($noteId: ID!, $folderId: ID!, $email: String!) {
    deleteNote(noteId: $noteId, folderId: $folderId, email: $email) {
      code
      success
      message
    }
  }
`,
    variables: { noteId, folderId, email },
});
