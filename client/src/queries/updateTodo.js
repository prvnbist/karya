import gql from 'graphql-tag'

const UPDATE_TODO = gql`
   mutation updateTodo(
      $id: ID!
      $title: String
      $tags: [String]
      $status: Status
   ) {
      updateTodo(id: $id, title: $title, tags: $tags, status: $status) {
         ... on Success {
            success
            data {
               id
               tags
               title
               status
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

export default UPDATE_TODO
