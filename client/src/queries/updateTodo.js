import gql from 'graphql-tag'

const UPDATE_TODO = gql`
   mutation updateTodo(
      $id: ID!
      $title: String
      $labels: [String]
      $status: Status
   ) {
      updateTodo(id: $id, title: $title, labels: $labels, status: $status) {
         ... on Success {
            success
            data {
               id
               labels
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
