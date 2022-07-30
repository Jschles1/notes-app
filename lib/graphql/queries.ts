export const GET_FOLDERS_QUERY = (email) => ({
    query: `
      query GetFolders($email: String!) { 
        getFolders(email: $email) { 
          code 
          success 
          message 
          folders { 
            _id 
            name
            user
            notes {
              _id
              name
              description
              folder
            }
          } 
        } 
      }
    `,
    variables: { email },
});
