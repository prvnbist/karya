import gql from 'graphql-tag'

const ADD_TODO = gql`
   mutation addTodo($title: String!, $tags: [String]!) {
      addTodo(title: $title, tags: $tags) {
         ... on Success {
            success
            data {
               id
               tags
               title
               createdAt
               updatedAt
            }
         }
         ... on Error {
            success
            error
         }
      }
   }
`

export default ADD_TODO
