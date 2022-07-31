export const CREATE_FOLDER_MUTATION = (name: string, email: string) => ({
  query: `
    mutation CreateFolder($name: String!, $email: String!) { 
      createFolder(name: $name, email: $email) { 
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
  variables: { name, email },
});

export const UPDATE_FOLDER_MUTATION = (
  id: string,
  name: string,
  email: string
) => ({
  query: `
    mutation UpdateFolder($id: ID!, $name: String!, $email: String!) {
      updateFolder(id: $id, name: $name, email: $email) {
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
  variables: { id, name, email },
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

export const CREATE_NOTE_MUTATION = (
  folderId: string,
  name: string,
  description: string,
  email: string
) => ({
  query: `
    mutation CreateNote($folderId: ID!, $name: String!, $description: String!, $email: String!) {
      createNote(folderId: $folderId, name: $name, description: $description, email: $email) {
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
  variables: { folderId, name, description, email },
});

export const UPDATE_NOTE_MUTATION = (
  noteId: string,
  folderId: string,
  name: string,
  description: string,
  email: string
) => ({
  query: `
  mutation UpdateNote($noteId: ID!, $folderId: ID!, $name: String!, $description: String!, $email: String!) {
    updateNote(noteId: $noteId, folderId: $folderId, name: $name, description: $description, email: $email) {
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
  variables: { noteId, folderId, name, description, email },
});