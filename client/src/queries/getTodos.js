import gql from 'graphql-tag'

const GET_TODOS = gql`
   query {
      todos {
         id
         label
         title
         status
         createdAt
         updatedAt
      }
   }
`

export default GET_TODOS
