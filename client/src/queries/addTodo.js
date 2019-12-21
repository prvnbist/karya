import gql from 'graphql-tag'

const ADD_TODO = gql`
   mutation addTodo($title: String!, $label: String) {
      addTodo(title: $title, label: $label) {
         ... on TodoSuccess {
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

export default ADD_TODO
