import gql from 'graphql-tag'

const ADD_TODO = gql`
   mutation addTodo($title: String!, $labels: [String]!) {
      addTodo(title: $title, labels: $labels) {
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

export default ADD_TODO
