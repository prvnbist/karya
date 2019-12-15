import gql from 'graphql-tag'

const UPDATE_TODO = gql`
   mutation updateTodo(
      $id: ID!
      $title: String
      $label: String
      $status: Status
   ) {
      updateTodo(id: $id, title: $title, label: $label, status: $status) {
         ... on Success {
            success
            data {
               id
               label
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
